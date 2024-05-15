import React, { useEffect } from "react";

import type { FigureProps } from "./Figure.types";
import { Image } from "react-konva";
import useImage from "use-image";

/**
 * A UI component that displays an SVG of the road sign on a canvas.
 * @param {IFigureProps} data
 * @returns React Konva Image component
 */
const Figure: React.FC<FigureProps> = ({
  angle = 0,
  url,
  x,
  y,
  size = { x: 3, y: 3 },
  scale = 1,
  onImageLoad
}) => {
  const [image, status] = useImage(url);

  useEffect(() => {
    if (image && status === "loaded" && onImageLoad) {
      onImageLoad(true);
    }
  });

  return (
    <Image
      scaleY={scale}
      scaleX={scale}
      offsetX={size.x / 2}
      offsetY={size.y / 2}
      x={x}
      y={y}
      width={size.x}
      height={size.y}
      image={image}
      rotation={angle}
    />
  );
};

export default Figure;
