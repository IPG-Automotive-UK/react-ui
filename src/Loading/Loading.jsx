import { Box, CircularProgress, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

export default function Loading({ label }) {
  // return components
  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        width: "100%"
      }}
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
