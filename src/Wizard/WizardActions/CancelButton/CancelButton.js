import * as React from "react";

import { Button } from "@mui/material";
import PropTypes from "prop-types";

/**
 * Cancel button component for Wizard
 */
export default function CancelButton({ onClick, disabled }) {
  return (
    <Button onClick={onClick} size="large" disabled={disabled}>
      Cancel
    </Button>
  );
}

// prop types
CancelButton.propTypes = {
  /**
   * If `true`, the button will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Callback function to handle click event
   */
  onClick: PropTypes.func
};
