import { Layer, Stage } from "react-konva";
import { Meta, StoryFn } from "@storybook/react";

import React from "react";
import TrafficLight from "./TrafficLight";
import { TrafficLightProps } from "./TrafficLight.types";

/**
 * Story metadata
 */
const meta: Meta<typeof TrafficLight> = {
  component: TrafficLight,
  title: "RoadView/TrafficLight"
};
export default meta;

// Story Template
const Template: StoryFn<TrafficLightProps> = args => {
  return (
    <Stage width={200} height={200} scale={{ x: 10, y: -10 }} x={100} y={100}>
      <Layer scaleY={-1}>
        <TrafficLight {...args} />
      </Layer>
    </Stage>
  );
};

// Default
export const Default = {
  args: {
    points: [0, 0]
  },
  render: Template
};

// With States
export const WithStates = {
  args: {
    points: [0, 0],
    state: 1
  },
  render: Template
};

// With Rotation
export const WithRotation = {
  args: {
    angle: 90,
    points: [1, 2]
  },
  render: Template
};

// Traffic Light Types
export const TrafficLightTypes = {
  args: {
    angle: 0,
    onTrafficLightLoad: (loaded: boolean) => console.log(loaded),
    points: [0, 0],
    type: "red-yellow-green-straight"
  },
  render: Template
};

// Traffic Light Scale
export const WithScale = {
  args: {
    angle: 0,
    points: [0, 0],
    scale: { x: 1.2, y: 1.2 },
    type: "red-yellow-green-straight"
  },
  render: Template
};
