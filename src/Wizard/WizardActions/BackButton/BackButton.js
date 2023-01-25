import * as React from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import PropTypes from "prop-types";

/**
 * Back button component for Wizard
 */
export default function BackButton({ onClick, disabled }) {
  return (
    <Button
      onClick={onClick}
      variant="outlined"
      size="large"
      disabled={disabled}
    >
      <ArrowBackIcon sx={{ mr: 1 }} />
      Back
    </Button>
  );
}

// prop types
BackButton.propTypes = {
  /**
   * If `true`, the button will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Callback function to handle click event
   */
  onClick: PropTypes.func
};
