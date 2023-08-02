import * as React from "react";

import { Box, Typography } from "@mui/material";

import PropTypes from "prop-types";
import StatusIcon from "../StatusIcon";

/**
 * Displays a status icon and text label.
 */
export default function StatusLabel({
  status,
  variant = "body2",
  height = 24,
  width = 24
}) {
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

StatusLabel.propTypes = {
  /**
   * Icon height
   */
  height: PropTypes.number,
  /**
   * The status type.
   */
  status: PropTypes.oneOf([
    "Passed",
    "Failed",
    "Not Run",
    "Pending",
    "cancelled",
    "completed",
    "failed",
    "not-ready",
    "ready",
    "running",
    "submitted"
  ]).isRequired,
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf([
    "body1",
    "body2",
    "caption",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "inherit",
    "subtitle1",
    "subtitle2"
  ]),
  /**
   * Icon width
   */
  width: PropTypes.number
};
