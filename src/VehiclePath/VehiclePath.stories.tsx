import { Layer, Stage } from "react-konva";
import {
  Marker,
  Trajectory,
  Vehicle,
  VehiclePathProps
} from "./VehiclePath.types";
import { Meta, StoryFn } from "@storybook/react";
import React, { useRef } from "react";

import Konva from "konva";
import VehiclePath from "./VehiclePath";

// Dummy data
const path: Trajectory = {
  color: "#FFAF2C",
  s: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  strokeWidth: 0.1,
  x: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  y: [0, 0, 5, 10, 15, 15, 10, 5, 0, 0],
  yaw: [0, 0, 0, 0, 0, 1.57, 1.57, 1.57, 1.57, 1.57],
  z: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
};

const vehicle: Vehicle = {
  color: "#FFAF2C",
  height: 5,
  label: "",
  width: 2
};

const marker: Marker = {
  color: "#FFAF2C",
  radius: 2
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
    <Stage width={300} height={300} scale={{ x: 5, y: -5 }} x={0} y={150}>
      <Layer ref={layerRef}>
        <VehiclePath {...args} />
      </Layer>
    </Stage>
  );
};

// Default
export const Default = {
  args: {
    index: 0,
    path,
    showPath: true,
    vehicle
  },
  render: Template
};

// Custom Color
export const CustomColor = {
  args: {
    index: 0,
    path: { ...path, color: "#ddddaa" },
    showPath: true,
    vehicle
  },
  render: Template
};

// Custom Stroke Width
export const CustomStrokeWidth = {
  args: {
    index: 0,
    path: { ...path, strokeWidth: 1 },
    showPath: true,
    vehicle
  },
  render: Template
};

// With Vehicle
export const WithVehicle = {
  args: {
    index: 3,
    path,
    showPath: true,
    vehicle
  },
  render: Template
};

// With Yawed Vehicle
export const WithYawedVehicle = {
  args: {
    index: 5,
    path,
    showPath: true,
    vehicle
  },
  render: Template
};

// With Colored Vehicle
export const WithColoredVehicle = {
  args: {
    index: 3,
    path,
    showPath: true,
    vehicle: { ...vehicle, color: "red" }
  },
  render: Template
};

// With Labeled Vehicle
export const WithLabeledVehicle = {
  args: {
    index: 3,
    path,
    showPath: true,
    vehicle: { ...vehicle, label: "Vroom" }
  },
  render: Template
};

// With Marker
export const WithMarker = {
  args: {
    index: 3,
    path,
    showPath: true,
    vehicle: marker
  },
  render: Template
};

// With Colored Marker
export const WithColoredMarker = {
  args: {
    index: 3,
    path,
    showPath: true,
    vehicle: { ...marker, color: "#aaaaaa" }
  },
  render: Template
};

// Hide Path
export const HidePath = {
  args: {
    index: 3,
    path,
    showPath: false,
    vehicle
  },
  render: Template
};
