import { Meta, StoryFn } from "@storybook/react";

import DifferenceChip from "./DifferenceChip";
import type { DifferenceChipProps } from "./DifferenceChip.types";
import React from "react";

/**
 * Story metadata
 */
export default {
  component: DifferenceChip,
  title: "General/DifferenceChip"
} satisfies Meta<typeof DifferenceChip>;

// Story Template
const Template: StoryFn<DifferenceChipProps> = args => {
  return <DifferenceChip {...args} />;
};

// Default story to show the chip with positive value
export const PositiveValue = {
  args: {
    value: 100.00001
  },
  render: Template
};

// Story to show the chip with negative value
export const NegativeValue = {
  args: {
    value: -5
  },
  render: Template
};

// Story to show the chip with unit and positive value
export const PositiveValueWithUnit = {
  args: {
    unit: "%",
    value: 5
  },
  render: Template
};

// Story to show the chip with unit and negative value
export const NegativeValueWithUnit = {
  args: {
    unit: "%",
    value: -5
  },
  render: Template
};
