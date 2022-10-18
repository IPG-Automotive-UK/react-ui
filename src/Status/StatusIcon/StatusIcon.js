import * as React from "react";

import { Avatar } from "@mui/material";
import PropTypes from "prop-types";
import statuses from "../statuses";

export default function StatusIcon({ status, width = 40, height = 40 }) {
  const {
    icon: { type: Icon, color }
  } = statuses[status];
  return (
    <Avatar
      sx={{
        bgcolor: color,
        height,
        width
      }}
    >
      <Icon
        sx={{
          height: height * 0.7,
          width: width * 0.7
        }}
      />
    </Avatar>
  );
}

StatusIcon.propTypes = {
  height: PropTypes.number,
  status: PropTypes.oneOf([
    "cancelled",
    "completed",
    "failed",
    "not-ready",
    "ready",
    "running",
    "submitted"
  ]).isRequired,
  width: PropTypes.number
};
