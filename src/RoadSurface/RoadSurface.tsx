import { Line } from "react-konva";
import React from "react";
import { RoadSurfaceProps } from "./RoadSurface.types";

const RoadSurface = (
  { points, color = "#78736e" }: RoadSurfaceProps,
  key: React.Key
) => {
  return (
    <Line
      key={key}
      scaleY={-1}
      closed
      fill={color}
      points={points.filter(
        (_, index) => index % 3 === 0 || (index - 1) % 3 === 0
      )}
      globalCompositeOperation="multiply"
    />
  );
};

export default RoadSurface;
