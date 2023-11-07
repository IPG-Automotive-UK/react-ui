import { useRef, useState } from "react";

/**
 * Hook to handle user selection rectangle on a canvas
 * @param {function} onSelectionRectangle Function to call on selection rectangle change
 * @param {object} options Options for the hook
 */
export default function useSelectionRectangle(
  onSelectionRectangle,
  options = {}
) {
  // extract options with defaults
  const { maxWidth = Infinity, maxHeight = Infinity } = options;

  // ref to the canvas element to calculate mouse offsets
  const canvasRef = useRef();

  // state to track initial mouse position
  // ref used to work with event callbacks defined in hook
  const startRef = useRef();

  // state
  const [rectangle, setRectangle] = useState({
    height: 0,
    left: 0,
    top: 0,
    width: 0
  });

  // if no callback, then we should never show a rectangle so return defaults
  if (!onSelectionRectangle) {
    return [false, rectangle, () => {}];
  }

  // start selection (for use with onMouseDown)
  const startSelection = event => {
    event.stopPropagation();

    // collect canvas bounds storing handle in ref for use in event callbacks
    canvasRef.current = event.target.closest("#canvas");
    const bounds = canvasRef.current.getBoundingClientRect();

    // calculate top/left based on mouse position and canvas bounds, storing in ref for use in event callbacks
    const left = event.clientX - bounds.left;
    const top = event.clientY - bounds.top;
    startRef.current = { left, top };

    // set rectangle state
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
    event.stopPropagation();

    // calculate canvas bounds
    const bounds = canvasRef.current.getBoundingClientRect();

    // clamp selection rectangle to canvas
    const left = Math.min(Math.max(event.clientX - bounds.left, 0), maxWidth);
    const top = Math.min(Math.max(event.clientY - bounds.top, 0), maxHeight);

    // calculate width and height
    const start = startRef.current;
    const width = start.left - left;
    const height = start.top - top;

    // set rectangle state
    const newRectangle = {
      height: Math.abs(height),
      left: width < 0 ? start.left : left,
      top: height < 0 ? start.top : top,
      width: Math.abs(width)
    };
    setRectangle(newRectangle);

    // call callback
    onSelectionRectangle(newRectangle);
  };

  // we are selecting if the rectangle has a width or height
  const isSelecting = rectangle.width > 0 && rectangle.height > 0;

  return [isSelecting, rectangle, startSelection];
}
