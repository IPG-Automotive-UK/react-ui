import { useRef, useState } from "react";

/**
 * Hook to handle user selection rectangle on a canvas
 * @param {*} onSelectionRectangle Function to call on selection rectangle change
 */
export default function useSelectionRectangle(onSelectionRectangle) {
  const ref = useRef();
  const startRef = useRef();

  // state
  const [rectangle, setRectangle] = useState({
    height: 0,
    left: 0,
    top: 0,
    width: 0
  });

  // start selection (for use with onMouseDown)
  const startSelection = event => {
    ref.current = event.target;
    const bounds = ref.current.getBoundingClientRect();

    const left = event.clientX - bounds.left;
    const top = event.clientY - bounds.top;
    startRef.current = { left, top };

    setRectangle({
      height: 10,
      left,
      top,
      width: 10
    });

    // handle users mouse off canvas and releasing
    window.addEventListener("mouseup", endSelection);
    window.addEventListener("mousemove", moveSelection);
  };

  // end selection (for use with onMouseUp)
  const endSelection = () => {
    setRectangle({
      height: 0,
      left: 0,
      top: 0,
      width: 0
    });
    window.removeEventListener("mouseup", endSelection);
    window.removeEventListener("mousemove", moveSelection);
  };

  // move selection (for use with onMouseMove)
  const moveSelection = event => {
    const bounds = ref.current.getBoundingClientRect();
    const left = event.clientX - bounds.left;
    const top = event.clientY - bounds.top;
    const start = startRef.current;

    const width = start.left - left;
    const height = start.top - top;

    const newRectangle = {
      height: Math.max(Math.abs(height), 10),
      left: width < 0 ? start.left : left,
      top: height < 0 ? start.top : top,
      width: Math.max(Math.abs(width), 10)
    };
    setRectangle(newRectangle);
    onSelectionRectangle(newRectangle);
  };

  const isSelecting = rectangle.width > 0 && rectangle.height > 0;

  return [isSelecting, rectangle, startSelection];
}
