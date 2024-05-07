import * as React from "react";

import { Box } from "@mui/material";
import { WizardContentProps } from "./WizardContent.types";

export default React.forwardRef<HTMLDivElement, WizardContentProps>(
  { children }: WizardContentProps,
  ref
) {
  return (
    <Box
      ref={ref}
      role="region"
      sx={{
        boxSizing: "border-box",
        height: "100%",
        justifyContent: "stretch",
        maxWidth: theme => theme?.layout?.content?.maxWidth,
        mb: 2,
        mx: "auto",
        overflow: "auto",
        width: "100%"
      }}
    >
      {children}
    </Box>
  );
});
