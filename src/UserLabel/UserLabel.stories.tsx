import { Meta, StoryFn } from "@storybook/react";

import { Box } from "@mui/material";
import React from "react";
import UserLabel from "./UserLabel";
import { UserLabelProps } from "./UserLabel.types";

/**
 * Story metadata
 */
const meta: Meta<typeof UserLabel> = {
  component: UserLabel,
  title: "Label/UserLabel"
};
export default meta;

// Story Template
const Template: StoryFn<UserLabelProps> = args => {
  return (
    <Box width={150}>
      <UserLabel {...args} />
    </Box>
  );
};

// Default
export const Default = {
  args: {
    label: "James Harper"
  },
  render: Template
};

// Custom color
export const CustomColor = {
  args: {
    color: "#EC407A",
    label: "James Harper"
  },
  render: Template
};

// Long Name
export const LongName = {
  args: {
    label: "James withAVeryLooooooooooongMiddleName Harper"
  },
  render: Template
};
