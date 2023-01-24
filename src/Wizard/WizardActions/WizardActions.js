import * as React from "react";

import { Stack } from "@mui/material";

/**
 * Wizard actions is a layout component that displays buttons in a row.
 */
export default function WizardActions({ children }) {
  return (
    <Stack
      direction="row"
      justifyContent="flex-end"
      spacing={2}
      p={3}
      sx={{ backgroundColor: theme => theme.palette.background.paper }}
    >
      {children}
    </Stack>
  );
}

// prop types
WizardActions.propTypes = {};
