import * as React from "react";

import { Box, SvgIcon } from "@mui/material";

import useResize from "./useResize";

/**
 * Diagonal resize handle for the bottom right corner of a box.
 */
export default function ResizeHandle({ sx = [], onResize }) {
  const onMouseDown = useResize(onResize);
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
          position: "absolute",
          right: 2
        }}
        viewBox="0 0 24 24"
        color="action"
      >
        <path d="M22,22H20V20H22V22M22,18H20V16H22V18M18,22H16V20H18V22M18,18H16V16H18V18M14,22H12V20H14V22M22,14H20V12H22V14Z" />
      </SvgIcon>
    </Box>
  );
}
