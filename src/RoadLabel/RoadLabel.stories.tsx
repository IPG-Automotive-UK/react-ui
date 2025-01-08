import { Meta, StoryFn } from "@storybook/react";

import { Box } from "@mui/material";
import React from "react";
import RoadLabel from "./RoadLabel";
import { RoadLabelProps } from "./RoadLabel.types";

/**
 * Story metadata
 */
const meta: Meta<typeof RoadLabel> = {
  component: RoadLabel,
  title: "Label/RoadLabel"
};
export default meta;

// Story Template
const Template: StoryFn<RoadLabelProps> = args => {
  return (
    <Box
      sx={{
        width: 150
      }}
    >
      <RoadLabel {...args} />
    </Box>
  );
};

// Default
export const Default = {
  args: {
    href: "https://example.com",
    label: "Road Name"
  },
  render: Template
};

// Long Road Name
export const LongRoadName = {
  args: {
    href: "https://example.com",
    label: "An Unnecessarily Long Road Name That Will Truncate"
  },
  render: Template
};

// No href
export const NoLink = {
  args: {
    label: "Road Name"
  },
  render: Template
};
