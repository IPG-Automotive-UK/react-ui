import { Meta, StoryFn } from "@storybook/react";

import { FilterButton } from "./FilterButton";
import { FilterButtonProps } from "./FilterButton.types";
import React from "react";
import { action } from "@storybook/addon-actions";

/**
 * Story metadata
 */
const meta: Meta<typeof FilterButton> = {
  component: FilterButton,
  title: "Filters/FilterButton"
};

export default meta;

/**
 * Story template for the FilterButton component
 */
const Template: StoryFn<FilterButtonProps> = args => <FilterButton {...args} />;

/**
 * Default story for the FilterButton component
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
