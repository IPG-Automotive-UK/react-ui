import { Meta, StoryFn } from "@storybook/react";

import React from "react";
import VersionLabel from "./VersionLabel";
import { VersionLabelProps } from "./VersionLabel.types";

/**
 * Story metadata
 */
const meta: Meta<typeof VersionLabel> = {
  component: VersionLabel,
  title: "Label/VersionLabel"
};
export default meta;

// Story Template
const Template: StoryFn<VersionLabelProps> = args => {
  return <VersionLabel {...args} />;
};

// Default
export const Default = {
  args: {
    label: "11"
  },
  render: Template
};
