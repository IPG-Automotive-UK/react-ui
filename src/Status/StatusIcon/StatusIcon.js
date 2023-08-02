import * as React from "react";

import PropTypes from "prop-types";
import statuses from "../statuses";

/**
 * Displays a status icon.
 */
export default function StatusIcon({ status, width = 40, height = 40 }) {
  const {
    icon: { type: Icon, color }
  } = statuses[status];
  return (
    <Icon
      sx={{
        color,
        height,
        width
      }}
    />
  );
}

StatusIcon.propTypes = {
  /**
   * Component height
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
   * Component width
   */
  width: PropTypes.number
};
