import { Box, Typography } from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import PropTypes from "prop-types";
import React from "react";

export default function NoLicensePage({
  labelHeader = "NGD license",
  labelBody = "No license found. Please retry."
}) {
  // return components
  return (
    <Box height="100%" width="100%" display="flex" flexDirection="column">
      <Typography color="textSecondary" display="inline" variant="h6">
        <Box display="flex">
          <Box display="flex" alignItems="center">
            <LockIcon color="action" fontSize="inherit" />
          </Box>
          {labelHeader}
        </Box>
      </Typography>
      <Box pl={2.5}>
        {labelHeader && labelHeader.length > 0 ? (
          <Typography color="textSecondary" display="inline" variant="body1">
            {labelBody}
          </Typography>
        ) : null}
      </Box>
    </Box>
  );
}

// prop types
NoLicensePage.propTypes = {
  /**
   * Message to diplay alongside the icon
   */
  labelBody: PropTypes.string,
  labelHeader: PropTypes.string
};
