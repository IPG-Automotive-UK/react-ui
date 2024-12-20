import { Meta, StoryFn } from "@storybook/react";

import FormatVersionLabel from "./FormatVersionLabel";
import { FormatVersionLabelProps } from "./FormatVersionLabel.types";
import React from "react";

/**
 * Story metadata
 */
const meta: Meta<typeof FormatVersionLabel> = {
  component: FormatVersionLabel,
  title: "Label/FormatVersionLabel"
};
export default meta;

// Story Template
const Template: StoryFn<FormatVersionLabelProps> = args => {
  return <FormatVersionLabel {...args} />;
};

// Default
export const Default = {
  args: {
    label: "11.1"
  },
  render: Template
};
