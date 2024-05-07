import { Layer, Stage } from "react-konva";
import { Meta, StoryFn } from "@storybook/react";

import React from "react";
import RoadMarking from "./RoadMarking";
import { RoadMarkingProps } from "./RoadMarking.types";

//  dummy data
const coordinates = [0, 0, 10, 0];

/**
 * Story metadata
 */
const meta: Meta<typeof RoadMarking> = {
  component: RoadMarking,
  title: "RoadView/RoadMarking"
};
export default meta;

// Story Template
const Template: StoryFn<RoadMarkingProps> = args => {
  return (
    <Stage width={200} height={200} scale={{ x: 15, y: -15 }} x={100} y={100}>
      <Layer scaleY={-1}>
        <RoadMarking {...args} />
      </Layer>
    </Stage>
  );
};

// Default
export const Default = {
  args: {
    color: "#ffffff",
    dash: [],
    points: coordinates,
    type: "single",
    width: 0.15
  },
  render: Template
};

// Custom Color
export const CustomColor = {
  args: {
    color: "red",
    dash: [],
    points: coordinates,
    type: "single",
    width: 0.15
  },
  render: Template
};

// Double
export const Double = {
  args: {
    color: "#ffffff",
    dash: [],
    points: coordinates,
    type: "double",
    width: 0.15
  },
  render: Template
};

// Dashed
export const Dashed = {
  args: {
    color: "#ffffff",
    dash: [1, 1],
    points: coordinates,
    type: "single",
    width: 0.15
  },
  render: Template
};
