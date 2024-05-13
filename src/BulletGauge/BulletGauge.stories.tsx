import { Meta, StoryFn } from "@storybook/react";

import BulletGauge from "./BulletGauge";
import { BulletGaugeProps } from "./BulletGauge.types";
import React from "react";
import { useArgs } from "@storybook/preview-api";

/**
 * Story metadata
 */
const meta: Meta<typeof BulletGauge> = {
  component: BulletGauge,
  title: "Plots/BulletGauge"
};
export default meta;

// Story Template
const Template: StoryFn<BulletGaugeProps> = args => {
  // useArgs is a hook that returns the current state of the args object
  const [{ value }, updateArgs] = useArgs<BulletGaugeProps>();

  // update the args object with the new markers value
  React.useEffect(() => {
    updateArgs({ value });
  }, [value, updateArgs]);

  return <BulletGauge {...args} />;
};

// Default
export const Default = {
  args: {
    markers: false,
    suffix: "%",
    title: "Data Maturity",
    value: 30
  },
  render: Template
};

// High
export const High = {
  args: {
    markers: false,
    suffix: "%",
    title: "Progress",
    value: 99
  },
  render: Template
};

// Low
export const Low = {
  args: {
    markers: false,
    suffix: "%",
    title: "Progress",
    value: 5
  },
  render: Template
};
