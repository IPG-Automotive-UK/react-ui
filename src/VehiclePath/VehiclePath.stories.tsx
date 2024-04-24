import { Layer, Stage } from "react-konva";
import { Meta, StoryFn } from "@storybook/react";
import React, { useRef } from "react";
import { Trajectory, VehiclePathProps } from "./VehiclePath.types";

import Konva from "konva";
import VehiclePath from "./VehiclePath";

// Dummy data
const path: Trajectory = {
  s: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  x: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  y: [0, 0, 5, 10, 15, 15, 10, 5, 0, 0],
  yaw: [0, 0, 0, 0, 0, 1.57, 1.57, 1.57, 1.57, 1.57],
  z: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
};

/**
 * Story metadata
 */
const meta: Meta<typeof VehiclePath> = {
  component: VehiclePath,
  title: "RoadView/VehiclePath"
};
export default meta;

// Story Template
const Template: StoryFn<VehiclePathProps> = args => {
  const layerRef = useRef<Konva.Layer>(null);
  return (
    <Stage width={200} height={200} scale={{ x: 10, y: -10 }} x={100} y={100}>
      <Layer ref={layerRef} scaleY={-1}>
        <VehiclePath {...args} />
      </Layer>
    </Stage>
  );
};

// Default
export const Default = {
  args: {
    path
  },
  render: Template
};
