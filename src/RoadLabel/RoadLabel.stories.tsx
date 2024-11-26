import { Meta, StoryFn } from "@storybook/react";

import React from "react";
import RoadLabel from "./RoadLabel";
import { RoadLabelProps } from "./RoadLabel.types";

/**
 * Story metadata
 */
const meta: Meta<typeof RoadLabel> = {
  component: RoadLabel,
  title: "Label/RoadLabel"
};
export default meta;

// Story Template
const Template: StoryFn<RoadLabelProps> = args => {
  return <RoadLabel {...args} />;
};

// Default
export const Default = {
  args: {
    href: "https://example.com",
    label: "Road Name"
  },
  render: Template
};

// No href
export const NoLink = {
  args: {
    label: "Road Name"
  },
  render: Template
};
