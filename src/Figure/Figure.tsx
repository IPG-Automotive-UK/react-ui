import React, { useEffect } from "react";

import type { FigureProps } from "./Figure.types";
import { Image } from "react-konva";
import useImage from "use-image";

/**
 * A UI component that displays an SVG of the road sign on a canvas.
 * @param FigureProps Object defining all necessary props for an image to be rendered
 * @returns React Konva Image component
 */
const Figure = ({
  angle = 0,
  url,
  x,
  y,
  height = 3,
  width = 3,
  scale = 1,
  onImageLoaded
}: FigureProps) => {
  const [image, status] = useImage(url);

  useEffect(() => {
    if (image && status === "loaded" && onImageLoaded) {
      onImageLoaded(true);
    }
  });

  return (
    <Image
      scaleY={-scale}
      scaleX={scale}
      offsetX={width / 2}
      offsetY={height / 2}
      x={x}
      y={y}
      width={width}
      height={height}
      image={image}
      rotation={angle}
    />
  );
};

export default Figure;
