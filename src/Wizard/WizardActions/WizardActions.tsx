import * as React from "react";

import { Stack } from "@mui/material";
import { WizardActionsProps } from "./WizardActions.types";

/**
 * Wizard actions is a layout component that displays buttons in a row.
 */
export default function WizardActions({ children }: WizardActionsProps) {
  return (
    <Stack
      role="toolbar"
      direction="row"
      justifyContent="flex-end"
      spacing={2}
      p={3}
      sx={{
        backgroundColor: theme => theme.palette.background.paper
      }}
      mx={-3}
    >
      {children}
    </Stack>
  );
}
