import * as React from "react";

import { Box } from "@mui/material";
import PropTypes from "prop-types";
import StatusIcon from "../StatusIcon";
import StatusMessage from "../StatusMessage";

/**
 * Displays a status icon and text label.
 */
export default function StatusLabel({ status }) {
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
      <StatusIcon status={status} height={24} width={24} />
      <StatusMessage status={status} />
    </Box>
  );
}

StatusLabel.propTypes = {
  /**
   * The status type.
   */
  status: PropTypes.oneOf([
    "cancelled",
    "completed",
    "failed",
    "not-ready",
    "ready",
    "running",
    "submitted"
  ]).isRequired
};
