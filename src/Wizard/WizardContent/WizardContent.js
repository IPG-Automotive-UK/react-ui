import * as React from "react";

import { Box } from "@mui/material";

export default function WizardContent({ children }) {
  return (
    <Box
      role="region"
      sx={{
        boxSizing: "border-box",
        justifyContent: "stretch",
        maxWidth: theme => theme?.layout?.content?.maxWidth,
        mb: 2,
        mx: "auto",
        overflow: "auto"
      }}
    >
      {children}
    </Box>
  );
}
