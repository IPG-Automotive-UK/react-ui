import { Box, CircularProgress, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";

export default function Loading({ label }) {
  // return components
  return (
    <Box
      height="100%"
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {label && label.length > 0 ? (
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <CircularProgress />
          <Box>
            <Typography color="textSecondary">{label}</Typography>
          </Box>
        </div>
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
}

// prop types
Loading.propTypes = {
  /**
   * Label to diplay below circular spinner
   */
  label: PropTypes.string
};
