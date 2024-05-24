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
  switch (type) {
    case "double":
      // plot symmetrical double lines
      return (
        <>
          <Line
            key={key}
            strokeWidth={width * 2.5}
            dash={dash}
            stroke={color}
            points={points}
          />
          <Line
            key={`${key}_cutout`}
            strokeWidth={width * 0.5}
            stroke={color}
            globalCompositeOperation="destination-out"
            points={points}
          />
        </>
      );
    case "single":
      // plot any of the single lines (single, broken, dotted)
      return (
        <Line
          key={key}
          strokeWidth={width}
          stroke={color}
          dash={dash}
          points={points}
        />
      );
  }
};

export default RoadMarking;
