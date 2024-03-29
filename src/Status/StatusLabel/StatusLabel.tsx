import * as React from "react";

import { Box, Typography } from "@mui/material";

import StatusIcon from "../StatusIcon";
import { StatusLabelProps } from "./StatusLabel.types";
import statuses from "../statuses";

/**
 * Displays a status icon and text label.
 */
export default function StatusLabel({
  status,
  variant = "body2",
  iconProps = {
    height: 20,
    width: 20
  }
}: StatusLabelProps) {
  const {
    label: { text }
  } = statuses[status];
  return (
    <Box
      sx={{
        alignItems: "center",
        display: "inline-flex",
        flexDirection: "row",
        gap: 1,
        justifyContent: "center"
      }}
    >
      <StatusIcon status={status} {...iconProps} />
      <Typography variant={variant}>{text}</Typography>
    </Box>
  );
}
