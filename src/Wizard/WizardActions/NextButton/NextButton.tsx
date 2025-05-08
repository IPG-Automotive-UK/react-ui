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
      sx={theme => ({
        color: theme.vars.palette.success.contrastText
      })}
      size="large"
      disabled={disabled}
    >
      Next
      <ArrowForwardIcon sx={{ ml: 1.5 }} />
    </Button>
  );
}
