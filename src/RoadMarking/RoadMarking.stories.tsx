import { Layer, Stage } from "react-konva";
import { Meta, StoryFn } from "@storybook/react";

import React from "react";
import RoadMarking from "./RoadMarking";
import { RoadMarkingProps } from "./RoadMarking.types";

//  dummy data
const coordinates = [0, 0, 0, 10, 0, 0, 10, 4, 0, 0, 4, 0];

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
    <Stage width={200} height={200} scale={{ x: 10, y: -10 }} x={100} y={100}>
      <Layer scaleY={-1}>
        <RoadMarking {...args} />
      </Layer>
    </Stage>
  );
};

// Default
export const Default = {
  args: {
    points: coordinates
  },
  render: Template
};

// Custom Color
export const CustomColor = {
  args: {
    color: "red",
    points: coordinates
  },
  render: Template
};

// Custom Color
export const SingleDashed = {
  args: {
    points: coordinates,
    type: "broken-line"
  },
  render: Template
};
