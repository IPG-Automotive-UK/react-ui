import type { FigureProps } from "./Figure.types";
import { Image } from "react-konva";
import React from "react";
import useImage from "use-image";

/**
 * A UI component that displays an SVG of the road sign on a canvas.
 * @param {IFigureProps} data
 * @returns React Konva Image component
 */
const Figure: React.FC<FigureProps> = ({
  url,
  x,
  y,
  size = { x: 3, y: 3 },
  scale = 1
}) => {
  const [image] = useImage(url);

  return (
    <Image
      scaleY={scale}
      scaleX={scale}
      offsetX={size.x / 2}
      offsetY={size.y / 2}
      x={x}
      y={y}
      width={size.y}
      height={size.x}
      image={image}
    />
  );
};

export default Figure;
