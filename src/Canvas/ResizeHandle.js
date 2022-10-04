import * as React from "react";

import { Box, SvgIcon } from "@mui/material";

import useResize from "./useResize";

/**
 * Diagonal resize handle for the bottom right corner of a box.
 */
export default function ResizeHandle({ sx = [], onResize, canvasSize }) {
  const onMouseDown = useResize(onResize, canvasSize);
  return (
    <Box
      sx={[
        {
          bottom: 0,
          cursor: "nwse-resize",
          height: 15,
          position: "absolute",
          right: 0,
          width: 15
        },
        ...(Array.isArray(sx) ? sx : [sx])
      ]}
      onMouseDown={onMouseDown}
    >
      <SvgIcon
        sx={{
          bottom: 2,
          height: 8,
          opacity: 0.7,
          position: "absolute",
          right: 2,
          width: 8
        }}
        viewBox="0 0 6 6"
        color="action"
      >
        <path d="M 6 6 L 0 6 L 0 4.2 L 4 4.2 L 4.2 4.2 L 4.2 0 L 6 0 L 6 6 L 6 6 Z" />
      </SvgIcon>
    </Box>
  );
}
