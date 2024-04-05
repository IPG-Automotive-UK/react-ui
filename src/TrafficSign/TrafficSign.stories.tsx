import { Layer, Stage } from "react-konva";
import { Meta, StoryFn } from "@storybook/react";

import React from "react";
import TrafficSign from "./TrafficSign";
import { TrafficSignProps } from "./TrafficSign.types";

/**
 * Story metadata
 */
const meta: Meta<typeof TrafficSign> = {
  component: TrafficSign,
  title: "RoadView/TrafficSign"
};
export default meta;

// Story Template
const Template: StoryFn<TrafficSignProps> = args => {
  return (
    <Stage width={200} height={200} scale={{ x: 12, y: -12 }} x={100} y={100}>
      <Layer scaleY={-1}>
        <TrafficSign {...args} />
      </Layer>
    </Stage>
  );
};

// Default
export const Default = {
  args: {
    points: [0, 0],
    type: "highway"
  },
  render: Template
};

// Rotated
export const Rotated = {
  args: {
    angle: 90,
    points: [0, 0],
    type: "highway"
  },
  render: Template
};

// With Value
export const WithValue = {
  args: {
    points: [0, 0],
    type: "speedLimit",
    value: "30"
  },
  render: Template
};

// Custom Size
export const Sized = {
  args: {
    points: [0, 0],
    size: { x: 10, y: 10 },
    type: "highway"
  },
  render: Template
};

// Custom Scale
export const Scaled = {
  args: {
    points: [0, 0],
    scale: 5,
    type: "highway"
  },
  render: Template
};
