import { Meta, StoryFn } from "@storybook/react";

import { ClearFilterButton } from "./ClearFilterButton";
import { ClearFilterButtonProps } from "./ClearFilterButton.types";
import React from "react";
import { action } from "@storybook/addon-actions";

/**
 * Story metadata
 */
const meta: Meta<typeof ClearFilterButton> = {
  component: ClearFilterButton,
  title: "Filters/ClearFilterButton"
};

export default meta;

/**
 * Story template for the ClearFilterButton component
 */
const Template: StoryFn<ClearFilterButtonProps> = args => (
  <ClearFilterButton {...args} />
);

/**
 * Default story for the ClearFilterButton component
 */
export const Default = {
  args: {
    onClick: action("onClick")
  },
  render: Template
};
