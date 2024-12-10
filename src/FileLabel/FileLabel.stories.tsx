import { Meta, StoryFn } from "@storybook/react";

import FileLabel from "./FileLabel";
import { FileLabelProps } from "./FileLabel.types";
import React from "react";

/**
 * Story metadata
 */
const meta: Meta<typeof FileLabel> = {
  component: FileLabel,
  title: "Label/FileLabel"
};
export default meta;

// Story Template
const Template: StoryFn<FileLabelProps> = args => {
  return <FileLabel {...args} />;
};

// Default
export const Default = {
  args: {
    label: "Road File"
  },
  render: Template
};
