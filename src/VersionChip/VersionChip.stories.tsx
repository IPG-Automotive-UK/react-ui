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
    selected: false,
    version: "1.0"
  },

  render: Template
};

export const SingleDigit = {
  args: {
    selected: false,
    version: "1"
  },

  render: Template
};

export const MinorVersion = {
  args: {
    selected: false,
    version: "1.1"
  },

  render: Template
};

export const SingleDigitSelected = {
  args: {
    selected: true,
    version: "1"
  },

  render: Template
};

export const MajorVersionSelected = {
  args: {
    selected: true,
    version: "2.0"
  },

  render: Template
};

export const MinorVersionSelected = {
  args: {
    selected: true,
    version: "2.3"
  },

  render: Template
};
