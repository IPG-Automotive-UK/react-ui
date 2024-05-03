import { Line } from "react-konva";
import React from "react";
import { RoadMarkingProps } from "./RoadMarking.types";

const RoadMarking = (
  {
    points,
    dash = [],
    width = 0.15,
    type = "single",
    color = "#ffffff"
  }: RoadMarkingProps,
  key: React.Key
) => {
  const pointsXY = points.filter(
    (_, index) => index % 3 === 0 || (index - 1) % 3 === 0
  );
  switch (type) {
    case "double":
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
    case "single":
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
