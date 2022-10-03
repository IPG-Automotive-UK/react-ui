import * as React from "react";

import { Box } from "@mui/material";

/**
 * Grid that is drawn on the canvas.
 */
export default function Grid({ color = "rgba(0,0,0,0.1)", size = 25 }) {
  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(0deg, ${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
        backgroundPosition: "-1px 0px",
        backgroundSize: `${size}px ${size}px`,
        height: "100%",
        left: 0,
        position: "absolute",
        top: 0,
        width: "100%"
      }}
    />
  );
}
