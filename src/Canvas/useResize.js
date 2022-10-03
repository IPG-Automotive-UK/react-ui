import { useState } from "react";

/**
 * Hook to handle resizing of a canvas
 * @param {*} onResize Function to call on resize
 */
export default function useResize(onResize) {
  // state to track initial mouse position
  const [start, setStart] = useState({ x: 0, y: 0 });

  // function to initialise resizing
  const startResize = event => {
    document.addEventListener("mouseup", endResize);
    document.addEventListener("mousemove", resize);
    setStart({ x: event.clientX, y: event.clientY });
    event.stopPropagation();
  };

  // function for resizing on mousemove
  const resize = event => {
    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    setStart({ x: event.clientX, y: event.clientY });
    onResize(deltaX, deltaY);
  };

  // function to end resizing
  const endResize = () => {
    setStart({ x: 0, y: 0 });
    document.removeEventListener("mouseup", endResize);
    document.removeEventListener("mousemove", resize);
  };

  return startResize;
}
