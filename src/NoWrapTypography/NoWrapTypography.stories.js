import { Box } from "@mui/material";
import NoWrapTypography from "./NoWrapTypography";
import React from "react";

export default {
  component: NoWrapTypography,
  title: "General/NoWrapTypography"
};

const Template = ({ children, maxWidth, sx }) => {
  return (
    <Box sx={{ border: "1px solid black", mt: 2, width: "350px" }}>
      <NoWrapTypography maxWidth={maxWidth} sx={sx}>
        {children}
      </NoWrapTypography>
    </Box>
  );
};

export const Default = Template.bind({});

Default.args = {
  children: "text that is too long to fit in the box",
  maxWidth: "250px",
  sx: { fontSize: "18px" }
};
