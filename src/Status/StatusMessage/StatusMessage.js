import * as React from "react";

import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import statuses from "../statuses";

/**
 * Displays a coloured status message.
 */
export default function StatusMessage({ status }) {
  const {
    label: { text, color }
  } = statuses[status];
  return (
    <Typography sx={{ color }} variant="body2">
      {text}
    </Typography>
  );
}

StatusMessage.propTypes = {
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
