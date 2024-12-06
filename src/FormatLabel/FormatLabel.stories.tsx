import { Meta, StoryFn } from "@storybook/react";

import { Box } from "@mui/material";
import FormatLabel from "./FormatLabel";
import { FormatLabelProps } from "./FormatLabel.types";
import React from "react";

/**
 * Story metadata
 */
const meta: Meta<typeof FormatLabel> = {
  component: FormatLabel,
  title: "Label/FormatLabel"
};
export default meta;

// Story Template
const Template: StoryFn<FormatLabelProps> = args => {
  return (
    <Box width={200}>
      <FormatLabel {...args} />
    </Box>
  );
};

// Default
export const Default = {
  args: {
    label: "My Custom Format"
  },
  render: Template
};

// Long Custom Format
export const LongCustomFormat = {
  args: {
    label: "My Custom Very Long Format"
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
