import { Meta, StoryFn } from "@storybook/react";

import FormatIconWithLabel from "./FormatIconWithLabel";
import { FormatIconWithLabelProps } from "./FormatIconWithLabel.types";
import React from "react";

/**
 * Story metadata
 */
const meta: Meta<typeof FormatIconWithLabel> = {
  component: FormatIconWithLabel,
  title: "General/FormatIconWithLabel"
};
export default meta;

// Story Template
const Template: StoryFn<FormatIconWithLabelProps> = args => {
  return <FormatIconWithLabel {...args} />;
};

// Default
export const Default = {
  args: {
    label: "My Custom Format"
  },
  render: Template
};

// CarMaker
export const CarMaker = {
  args: {
    label: "CarMaker"
  },
  render: Template
};

// CM4SL
export const CM4SL = {
  args: {
    label: "CM4SL"
  },
  render: Template
};

// TruckMaker
export const TruckMaker = {
  args: {
    label: "TruckMaker"
  },
  render: Template
};

// TM4SL
export const TM4SL = {
  args: {
    label: "TM4SL"
  },
  render: Template
};

// ASAM OpenSenario XML
export const ASAMOpenScenario = {
  args: {
    label: "ASAM OpenSCENARIO XML"
  },
  render: Template
};

// ASAM OpenDRIVE
export const ASAMOpenDRIVE = {
  args: {
    label: "ASAM OpenDRIVE"
  },
  render: Template
};
