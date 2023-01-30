import * as React from "react";

import { Box, Typography } from "@mui/material";

import PropTypes from "prop-types";

/**
 * The Wizard component allows you to create a multi-step form.
 * It handles title and layout.
 */
export default function Wizard({ title, children }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%"
      }}
    >
      {title ? (
        <Typography
          variant="h5"
          color="textPrimary"
          sx={{
            fontWeight: 500,
            maxWidth: 945,
            mb: 3,
            mt: 1,
            mx: "auto",
            width: "100%"
          }}
        >
          {title}
        </Typography>
      ) : null}
      {children}
    </Box>
  );
}

// prop types
Wizard.propTypes = {
  /**
   * Children. Should be WizardSteps, WizardContent, and WizardActions components in that order.
   */
  children: PropTypes.node,
  /**
   * Wizard title
   */
  title: PropTypes.string
};
