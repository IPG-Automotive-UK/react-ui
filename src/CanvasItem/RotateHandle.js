import * as React from "react";

import { Box } from "@mui/material";

export default function RotateHandle({ onRotate }) {
  return (
    <Box
      sx={{
        position: "absolute",
        width: "10px",
        height: "30px",
        top: "-30px ",
        left: "calc(50% - 5px)"
      }}
    >
      <Box
        sx={{
          position: "absolute",
          left: "50%",
          height: "100%",
          width: "1px",
          background: theme => theme.palette.primary.main
        }}
      ></Box>
      <Box
        sx={{
          position: "absolute",
          width: "10px",
          height: "10px",
          top: "0px",
          left: "0px",
          background: theme => theme.palette.primary.main,
          cursor: "grab",
          outline: theme => `2px solid ${theme.palette.background.paper}`,
          borderRadius: "50%"
        }}
        onMouseDown={onRotate}
      ></Box>
    </Box>
  );
}
