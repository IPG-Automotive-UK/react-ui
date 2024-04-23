import { Line } from "react-konva";
import React from "react";
import { RoadMarkingProps } from "./RoadMarking.types";

const RoadMarking: React.FC<RoadMarkingProps> = (
  {
    points,
    dash = undefined,
    width = 0.15,
    type = "single-line",
    color = "#ffffff"
  },
  key
) => {
  const pointsXY = points.filter(
    (_, index) => index % 3 === 0 || (index - 1) % 3 === 0
  );
  if (type.includes("double")) {
    // plot symmetrical double lines
    return (
      <>
        <Line
          key={key}
          strokeWidth={width * 2.5}
          scaleY={-1}
          dash={dash}
          stroke={color}
          points={pointsXY}
        />
        <Line
          key={`${key}_cutout`}
          strokeWidth={width * 0.5}
          scaleY={-1}
          stroke={color}
          globalCompositeOperation="destination-out"
          points={pointsXY}
        />
      </>
    );
  } else {
    // plot any of the single lines (single, broken, dotted)
    return (
      <Line
        key={key}
        strokeWidth={width}
        scaleY={-1}
        stroke={color}
        dash={dash}
        points={pointsXY}
      />
    );
  }
};

export default RoadMarking;
