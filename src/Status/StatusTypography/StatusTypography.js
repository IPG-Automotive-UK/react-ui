import * as React from "react";

import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import statuses from "../statuses";

export default function StatusTypography({ status }) {
  console.log(status);
  const {
    label: { text, color }
  } = statuses[status];
  return (
    <Typography sx={{ color }} variant="body2">
      {text}
    </Typography>
  );
}

StatusTypography.propTypes = {
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
