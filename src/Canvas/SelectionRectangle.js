import * as React from "react";

import { Box } from "@mui/material";

/**
 * Rectangle that is drawn when the user is selecting a region of the canvas.
 */
export default function SelectionRectangle({
  height = 0,
  width = 0,
  left = 0,
  top = 0
}) {
  return (
    <Box
      sx={{
        cursor: "crosshair",
        height: `${height}px`,
        left,
        outline: theme => `1px solid ${theme.palette.primary.main}`,
        position: "absolute",
        top,
        width: `${width}px`
      }}
    />
  );
}
