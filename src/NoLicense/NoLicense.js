import { Box, Typography } from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import PropTypes from "prop-types";
import React from "react";

export default function NoLicense({
  labelHeader = "NGD license",
  labelBody = "No license found. Please retry."
}) {
  // return components
  return (
    <Box height="100%" width="100%" display="flex">
      <Box display="flex" flexDirection="column" alignItems="centre">
        <LockIcon color="action" fontSize="medium" />
      </Box>
      <Box display="flex" flexDirection="column">
        <Typography color="textSecondary" display="inline" variant="h6">
          {labelHeader}
        </Typography>
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
NoLicense.propTypes = {
  /**
   * Message to display below the header text
   */
  labelBody: PropTypes.string,

  /**
   * Message to diplay alongside the icon (header)
   */
  labelHeader: PropTypes.string
};
