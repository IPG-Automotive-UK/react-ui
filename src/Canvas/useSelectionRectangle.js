import { useRef, useState } from "react";

/**
 * Hook to handle user selection rectangle on a canvas
 * @param {*} onSelectionRectangle Function to call on selection rectangle change
 */
export default function useSelectionRectangle(
  onSelectionRectangle,
  options = {}
) {
  const { maxWidth = Infinity, maxHeight = Infinity } = options;

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
    event.stopPropagation();

    ref.current = event.target;
    const bounds = ref.current.getBoundingClientRect();

    const left = event.clientX - bounds.left;
    const top = event.clientY - bounds.top;
    startRef.current = { left, top };

    setRectangle({
      height: 1,
      left,
      top,
      width: 1
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
    // clamp selection rectangle to canvas
    const left = Math.min(Math.max(event.clientX - bounds.left, 0), maxWidth);
    const top = Math.min(Math.max(event.clientY - bounds.top, 0), maxHeight);

    const start = startRef.current;

    const width = start.left - left;
    const height = start.top - top;

    const newRectangle = {
      height: Math.abs(height),
      left: width < 0 ? start.left : left,
      top: height < 0 ? start.top : top,
      width: Math.abs(width)
    };
    setRectangle(newRectangle);
    onSelectionRectangle(newRectangle);
  };

  const isSelecting = rectangle.width > 0 && rectangle.height > 0;

  return [isSelecting, rectangle, startSelection];
}
