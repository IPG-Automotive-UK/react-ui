import { Box, Typography } from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import PropTypes from "prop-types";
import React from "react";

export default function NoLicensePage({
  label = "No license found. Please retry."
}) {
  // return components
  return (
    <Box height="100%" width="100%">
      <Typography color="textSecondary" display="inline" variant="h6">
        <Box display="flex">
          <Box display="flex" alignItems="center">
            <LockIcon color="action" fontSize="inherit" />
          </Box>
          {label}
        </Box>
      </Typography>
    </Box>
  );
}

// prop types
NoLicensePage.propTypes = {
  /**
   * Message to diplay alongside the icon
   */
  label: PropTypes.string
};
