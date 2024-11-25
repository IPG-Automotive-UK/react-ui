import { Meta, StoryFn } from "@storybook/react";

import React from "react";
import { SetFilterButton } from "./SetFilterButton";
import { SetFilterButtonProps } from "./SetFilterButton.types";
import { action } from "@storybook/addon-actions";

/**
 * Story metadata
 */
const meta: Meta<typeof SetFilterButton> = {
  component: SetFilterButton,
  title: "Filters/SetFilterButton"
};

export default meta;

/**
 * Story template for the SetFilterButton component
 */
const Template: StoryFn<SetFilterButtonProps> = args => (
  <SetFilterButton {...args} />
);

/**
 * Default story for the SetFilterButton component
 */
export const Default = {
  args: {
    count: 0,
    onClick: action("onClick")
  },
  render: Template
};

/**
 * Story with filter count
 */
export const WithCount = {
  args: {
    count: 1,
    onClick: action("onClick")
  },
  render: Template
};
