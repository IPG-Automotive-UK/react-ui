import * as React from "react";

import { Button } from "@mui/material";
import { CancelButtonProps } from "./CancelButton.types";

/**
 * Cancel button component for Wizard
 */
export default function CancelButton({ onClick, disabled }: CancelButtonProps) {
  return (
    <Button onClick={onClick} size="large" disabled={disabled}>
      Cancel
    </Button>
  );
}
