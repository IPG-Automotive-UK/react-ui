import { Meta, StoryFn } from "@storybook/react";

import DateLabel from "./DateLabel";
import { DateLabelProps } from "./DateLabel.types";
import React from "react";

/**
 * Story metadata
 */
const meta: Meta<typeof DateLabel> = {
  component: DateLabel,
  title: "Label/DateLabel"
};
export default meta;

// Story Template
const Template: StoryFn<DateLabelProps> = args => {
  return <DateLabel {...args} />;
};

// Default
export const Default = {
  args: {
    label: "10-09-24 10:24:08"
  },
  render: Template
};
