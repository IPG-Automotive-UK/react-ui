import { Layer, Stage } from "react-konva";
import { Meta, StoryFn } from "@storybook/react";

import React from "react";
import RoadSurface from "./RoadSurface";
import { RoadSurfaceProps } from "./RoadSurface.types";

//  dummy data
const coordinates = [0, 0, 0, 10, 0, 0, 10, 4, 0, 0, 4, 0];

/**
 * Story metadata
 */
const meta: Meta<typeof RoadSurface> = {
  component: RoadSurface,
  title: "RoadView/RoadSurface"
};
export default meta;

// Story Template
const Template: StoryFn<RoadSurfaceProps> = args => {
  return (
    <Stage width={200} height={200} scale={{ x: 10, y: -10 }} x={100} y={100}>
      <Layer scaleY={-1}>
        <RoadSurface {...args} />
      </Layer>
    </Stage>
  );
};

// Default
export const Default = {
  args: {
    color: "#78736e",
    points: coordinates
  },
  render: Template
};

// Custom colour road
export const CustomColor = {
  args: {
    color: "white",
    points: coordinates
  },
  render: Template
};
