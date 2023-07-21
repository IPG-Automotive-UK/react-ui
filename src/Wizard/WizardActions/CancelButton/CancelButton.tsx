import * as React from "react";

import { Button } from "@mui/material";
import { WizardActionButtonProps } from "../WizardActions.types";

/**
 * Cancel button component for Wizard
 */
export default function CancelButton({
  onClick,
  disabled
}: WizardActionButtonProps) {
  return (
    <Button onClick={onClick} size="large" disabled={disabled}>
      Cancel
    </Button>
  );
}
