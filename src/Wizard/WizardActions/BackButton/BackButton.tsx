import * as React from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import { WizardActionButtonProps } from "../WizardActions.types";

/**
 * Back button component for Wizard
 */
export default function BackButton({
  onClick,
  disabled
}: WizardActionButtonProps) {
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
