import * as React from "react";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Button } from "@mui/material";
import { WizardActionButtonProps } from "../WizardActions.types";

/**
 * Next button component for Wizard
 */
export default function NextButton({
  onClick,
  disabled
}: WizardActionButtonProps) {
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
