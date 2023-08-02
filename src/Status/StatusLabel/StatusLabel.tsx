import * as React from "react";

import { Box, Typography } from "@mui/material";

import StatusIcon from "../StatusIcon";
import { StatusLabelProps } from "./StatusLabel.types";

/**
 * Displays a status icon and text label.
 */
export default function StatusLabel({
  status,
  variant = "body2",
  height = 24,
  width = 24
}: StatusLabelProps) {
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
      <StatusIcon status={status} height={height} width={width} />
      <Typography variant={variant}>{status}</Typography>
    </Box>
  );
}
