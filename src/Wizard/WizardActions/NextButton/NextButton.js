import * as React from "react";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Button } from "@mui/material";
import PropTypes from "prop-types";

/**
 * Next button component for Wizard
 */
export default function NextButton({ onClick, disabled }) {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      color="primary"
      size="large"
      disabled={disabled}
    >
      Next
      <ArrowForwardIcon sx={{ ml: 1.5 }} />
    </Button>
  );
}

// prop types
NextButton.propTypes = {
  /**
   * If `true`, the button will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Callback function to handle click event
   */
  onClick: PropTypes.func
};
