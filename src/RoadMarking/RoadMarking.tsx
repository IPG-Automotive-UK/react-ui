import { Line } from "react-konva";
import React from "react";
import { RoadMarkingProps } from "./RoadMarking.types";

const RoadMarking: React.FC<RoadMarkingProps> = (
  { points, dash, width, type, color },
  key
) => {
  const pointsXY = marking.points.filter(
    (_, index) => index % 3 === 0 || (index - 1) % 3 === 0
  );
  if (marking.type.includes("double")) {
    // plot symmetrical double lines
    return (
      <>
        <Line
          key={key}
          strokeWidth={marking.width * 2.5}
          scaleY={-1}
          dash={[marking.dashLength, marking.spaceLength]}
          stroke={marking.color}
          points={pointsXY}
        />
        <Line
          key={`${key}_cutout`}
          strokeWidth={marking.width * 0.5}
          scaleY={-1}
          stroke={marking.color}
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
        strokeWidth={marking.width}
        scaleY={-1}
        stroke={marking.color}
        dash={[marking.dashLength, marking.spaceLength]}
        points={pointsXY}
      />
    );
  }
};

export default RoadMarking;
