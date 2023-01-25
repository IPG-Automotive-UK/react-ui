import * as React from "react";

import { Box } from "@mui/material";

export default function WizardContent({ children }) {
  return (
    <Box
      sx={{
        boxSizing: "border-box",
        justifyContent: "stretch",
        maxWidth: 945,
        mx: "auto",
        overflow: "auto"
      }}
    >
      {children}
    </Box>
  );
}
