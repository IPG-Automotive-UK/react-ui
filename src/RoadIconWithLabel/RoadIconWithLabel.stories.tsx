import { Meta, StoryFn } from "@storybook/react";

import React from "react";
import RoadIconWithLabel from "./RoadIconWithLabel";
import { RoadIconWithLabelProps } from "./RoadIconWithLabel.types";

/**
 * Story metadata
 */
const meta: Meta<typeof RoadIconWithLabel> = {
  component: RoadIconWithLabel,
  title: "General/RoadIconWithLabel"
};
export default meta;

// Story Template
const Template: StoryFn<RoadIconWithLabelProps> = args => {
  return <RoadIconWithLabel {...args} />;
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
