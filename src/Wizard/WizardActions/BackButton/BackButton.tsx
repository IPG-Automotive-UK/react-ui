import * as React from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BackButtonProps } from "./BackButton.types";
import { Button } from "@mui/material";

/**
 * Back button component for Wizard
 */
export default function BackButton({ onClick, disabled }: BackButtonProps) {
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
