import * as React from "react";

import { Box } from "@mui/material";
import PropTypes from "prop-types";
import StatusIcon from "../StatusIcon/StatusIcon";
import StatusTypography from "../StatusTypography/StatusTypography";

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
      <StatusTypography status={status} />
    </Box>
  );
}

StatusLabel.propTypes = {
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
