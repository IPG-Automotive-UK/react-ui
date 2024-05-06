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
    <Stage width={200} height={200} scale={{ x: 10, y: -10 }} x={100} y={100}>
      <Layer scaleY={-1}>
        <TrafficSign {...args} />
      </Layer>
    </Stage>
  );
};

// Default
export const Default = {
  args: {
    angle: 0,
    height: 3,
    onTrafficSignLoaded: () => ((window as any).imageLoaded = true),
    points: [0, 0],
    scale: 1,
    type: "highway",
    width: 3
  },
  render: Template
};

// Rotated
export const Rotated = {
  args: {
    angle: 90,
    height: 3,
    onTrafficSignLoaded: () => ((window as any).imageLoaded = true),
    points: [0, 0],
    scale: 1,
    type: "highway",
    width: 3
  },
  render: Template
};

// With Value
export const WithValue = {
  args: {
    angle: 0,
    height: 3,
    onTrafficSignLoaded: () => ((window as any).imageLoaded = true),
    points: [0, 0],
    scale: 1,
    type: "speedLimit30",
    width: 3
  },
  render: Template
};

// Custom Size
export const Sized = {
  args: {
    angle: 0,
    height: 10,
    onTrafficSignLoaded: () => ((window as any).imageLoaded = true),
    points: [0, 0],
    scale: 1,
    type: "highway",
    width: 5
  },
  render: Template
};

// Custom Scale
export const Scaled = {
  args: {
    angle: 0,
    height: 3,
    onTrafficSignLoaded: () => ((window as any).imageLoaded = true),
    points: [0, 0],
    scale: 5,
    type: "highway",
    width: 3
  },
  render: Template
};
