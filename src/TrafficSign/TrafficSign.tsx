import Figure from "../Figure";
import React from "react";
import { TrafficSignProps } from "./TrafficSign.types";
import { getRoadSignName } from "./TrafficSignHelper";

/**
 * A UI component that displays an svg of the road sign on the canvas
 * @param TrafficSignProps Object defining all necessary information for a traffic sign
 */
const TrafficSign = ({
  angle = 0,
  type,
  points,
  scale = 1,
  height = 3,
  width = 3,
  onTrafficSignLoaded
}: TrafficSignProps) => {
  return (
    <Figure
      url={getRoadSignName(type).toString()}
      x={points[0]}
      y={points[1]}
      scale={scale}
      height={height}
      width={width}
      angle={angle}
      onImageLoaded={onTrafficSignLoaded}
    />
  );
};

export default TrafficSign;
