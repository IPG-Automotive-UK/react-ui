import { Meta, StoryFn } from "@storybook/react";

import React from "react";
import VersionChip from "./VersionChip";
import { VersionChipProps } from "./VersionChip.types";

/**
 * Story metadata
 */
const meta: Meta<typeof VersionChip> = {
  component: VersionChip,
  title: "General/VersionChip"
};
export default meta;

const Template: StoryFn<VersionChipProps> = args => {
  return <VersionChip {...args} />;
};

export const Default = {
  args: {

  },

  render: Template
};