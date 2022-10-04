import { useRef } from "react";

/**
 * Hook to handle resizing of a canvas
 * @param {*} onResize Function to call on resize
 */
export default function useResize(onResize) {
  // state to track initial mouse position
  const start = useRef({
    height: 0,
    width: 0,
    x: 0,
    y: 0
  });

  // function to initialise resizing
  const startResize = event => {
    document.addEventListener("mouseup", endResize);
    document.addEventListener("mousemove", resize);
    const { width, height } =
      event.currentTarget.parentElement.getBoundingClientRect();
    start.current = {
      height,
      width,
      x: event.clientX,
      y: event.clientY
    };
    event.stopPropagation();
  };

  // function for resizing on mousemove
  const resize = event => {
    const deltaX = event.clientX - start.current.x;
    const deltaY = event.clientY - start.current.y;

    onResize(start.current.width + deltaX, start.current.height + deltaY);
  };

  // function to end resizing
  const endResize = () => {
    start.current = { x: 0, y: 0 };

    document.removeEventListener("mouseup", endResize);
    document.removeEventListener("mousemove", resize);
  };

  return startResize;
}
