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
  gap = 1,
  color = "text.primary",
  iconProps = {
    height: 20,
    padding: "2px",
    width: 20
  }
}: StatusLabelProps) {
  const {
    label: { text }
  } = statuses[status];
  return (
    <Box
      data-testid="status-label"
      sx={{
        alignItems: "center",
        display: "inline-flex",
        flexDirection: "row",
        gap,
        justifyContent: "center"
      }}
    >
      <StatusIcon status={status} {...iconProps} />
      <Typography color={color} variant={variant}>
        {text}
      </Typography>
    </Box>
  );
}
