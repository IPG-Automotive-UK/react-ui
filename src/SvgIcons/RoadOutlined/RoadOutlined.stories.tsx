import { Meta, StoryFn } from "@storybook/react";

import React from "react";
import { RoadOutlined } from "./RoadOutlined";
import { RoadOutlinedProps } from "./RoadOutlined.types";

/**
 * Story metadata
 */
const meta: Meta<typeof RoadOutlined> = {
  component: RoadOutlined,
  title: "General/SvgIcons/RoadOutlined"
};
export default meta;

const Template: StoryFn<RoadOutlinedProps> = args => {
  return <RoadOutlined {...args} />;
};

export const Default = {
  args: {
    sx: { height: 60, width: 60 }
  },

  render: Template
};
