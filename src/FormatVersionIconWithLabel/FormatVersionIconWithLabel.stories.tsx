import { Meta, StoryFn } from "@storybook/react";

import FormatVersionIconWithLabel from "./FormatVersionIconWithLabel";
import { FormatVersionIconWithLabelProps } from "./FormatVersionIconWithLabel.types";
import React from "react";

/**
 * Story metadata
 */
const meta: Meta<typeof FormatVersionIconWithLabel> = {
  component: FormatVersionIconWithLabel,
  title: "General/FormatVersionIconWithLabel"
};
export default meta;

// Story Template
const Template: StoryFn<FormatVersionIconWithLabelProps> = args => {
  return <FormatVersionIconWithLabel {...args} />;
};

// Default
export const Default = {
  args: {
    label: "11.1"
  },
  render: Template
};
