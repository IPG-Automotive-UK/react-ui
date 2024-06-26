import { Circle } from "react-konva";
import type { MarkerProps } from "./VehiclePath.types";
import React from "react";

/**
 * A component used to mark an x,y position on a Konva React canvas with a circle.
 */
const Marker = (
  { x, y, radius = 1, color = "#FFAF2C" }: MarkerProps,
  key: React.Key
) => {
  return <Circle x={x} y={y} radius={radius} key={key} fill={color} />;
};

export default Marker;
