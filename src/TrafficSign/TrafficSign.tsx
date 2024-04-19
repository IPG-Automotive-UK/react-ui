import Figure from "../Figure";
import React from "react";
import { TrafficSignProps } from "./TrafficSign.types";
import { getRoadSignName } from "./TrafficSignHelper";

/**
 * A UI component that displays an SVG of the road sign on a canvas.
 * @param angle The angle of rotation of the image in degrees
 * @param type The name of the road sign
 * @param value The value within the road sign (e.g., "50") for a speed limit
 * @param points List of coordinates of the image on the canvas [x,y]
 * @param scale A number to scale the image, keeping the aspect ratio
 * @param size An object that allows sizing x and y independently
 * @returns React Konva Image component
 */
const TrafficSign: React.FC<TrafficSignProps> = ({
  angle = 0,
  type,
  value = "",
  points,
  scale,
  size,
  onTrafficSignLoad
}) => {
  return (
    <Figure
      url={getRoadSignName(type, value).toString()}
      x={points[0]}
      y={points[1]}
      scale={scale}
      size={size}
      angle={angle}
      onImageLoad={onTrafficSignLoad}
    />
  );
};

export default TrafficSign;
