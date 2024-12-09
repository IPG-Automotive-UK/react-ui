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
      spacing={2}
      sx={{
        backgroundColor: theme => theme.palette.background.paper,
        justifyContent: "flex-end",
        mx: -3,
        p: 3
      }}
    >
      {children}
    </Stack>
  );
}
