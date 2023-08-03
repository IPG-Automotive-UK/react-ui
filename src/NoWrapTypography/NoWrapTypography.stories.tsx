import { Meta, StoryFn } from "@storybook/react";

import { Box } from "@mui/material";
import NoWrapTypography from "./NoWrapTypography";
import { NoWrapTypographyProps } from "./NoWrapTypography.types";
import React from "react";

/**
 * Story metadata
 */
const meta: Meta<typeof NoWrapTypography> = {
  component: NoWrapTypography,
  title: "General/NoWrapTypography"
};
export default meta;

const Template: StoryFn<NoWrapTypographyProps> = ({ children, sx }) => {
  return (
    <Box sx={{ border: "1px solid black", mt: 2, width: "350px" }}>
      <NoWrapTypography sx={sx}>{children}</NoWrapTypography>
    </Box>
  );
};

export const Default = {
  render: Template,

  args: {
    children: "text that is too long to fit in the box",
    sx: { fontSize: "18px", maxWidth: "250px" }
  }
};
