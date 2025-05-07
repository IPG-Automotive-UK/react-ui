import * as React from "react";

import { Box } from "@mui/material";
import PropTypes from "prop-types";

/**
 * Rotation handle for rotating a rectangle.
 */
export default function RotateHandle({ onRotate }) {
  return (
    <Box
      sx={{
        cursor: "default",
        height: "22px",
        left: "calc(50% - 5px)",
        position: "absolute",
        top: "-22px ",
        width: "10px"
      }}
      onMouseDown={e => e.stopPropagation()}
      onDragStart={e => e.preventDefault()}
      onClick={e => e.stopPropagation()}
    >
      <Box
        sx={theme => ({
          background: theme.vars.palette.primary.main,
          height: "100%",
          left: "50%",
          position: "absolute",
          width: "1px"
        })}
      ></Box>
      <Box
        sx={theme => ({
          background: theme.vars.palette.primary.main,
          borderRadius: "50%",
          cursor: "grab",
          height: "10px",
          left: "0px",
          outline: `2px solid ${theme.vars.palette.background.paper}`,
          position: "absolute",
          top: "0px",
          width: "10px"
        })}
        onMouseDown={onRotate}
        onDragStart={e => e.preventDefault()}
        onDrag={e => e.preventDefault()}
      ></Box>
    </Box>
  );
}

RotateHandle.propTypes = {
  /**
   * Callback for when the user starts rotating the rectangle
   */
  onRotate: PropTypes.func
};
