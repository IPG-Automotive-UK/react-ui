import Figure from "../Figure";
import React from "react";
import { TrafficSignProps } from "./TrafficSign.types";
import { getRoadSignName } from "./TrafficSignHelper";

/**
 * A UI component that displays an SVG of the road sign on a canvas.
 * @param {RoadViewSignProps} data
 * @returns React Konva Image component
 */
const RoadViewSign: React.FC<TrafficSignProps> = ({
  angle = 0,
  type,
  value = "",
  points,
  scale,
  size
}) => {
  return (
    <Figure
      url={getRoadSignName(type, value).toString()}
      x={points[0]}
      y={points[1]}
      scale={scale}
      size={size}
      angle={angle}
    />
  );
};

export default RoadViewSign;
