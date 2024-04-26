import { Circle } from "react-konva";
import type { MarkerProps } from "./VehiclePath.types";
import React from "react";

const Marker: React.FC<MarkerProps> = (
  { x, y, radius = 1, color = "#5E8AB4" },
  key
) => {
  return <Circle x={x} y={y} radius={radius} key={key} fill={color} />;
};

export default Marker;
