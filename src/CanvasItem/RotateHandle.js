import * as React from "react";

import { Box } from "@mui/material";

export default function RotateHandle({ onRotate }) {
  return (
    <Box
      sx={{
        height: "30px",
        left: "calc(50% - 5px)",
        position: "absolute",
        top: "-30px ",
        width: "10px"
      }}
    >
      <Box
        sx={{
          background: theme => theme.palette.primary.main,
          height: "100%",
          left: "50%",
          position: "absolute",
          width: "1px"
        }}
      ></Box>
      <Box
        sx={{
          background: theme => theme.palette.primary.main,
          borderRadius: "50%",
          cursor: "grab",
          height: "10px",
          left: "0px",
          outline: theme => `2px solid ${theme.palette.background.paper}`,
          position: "absolute",
          top: "0px",
          width: "10px"
        }}
        onMouseDown={onRotate}
        onDragStart={e => e.preventDefault()}
        onDrag={e => e.preventDefault()}
      ></Box>
    </Box>
  );
}
