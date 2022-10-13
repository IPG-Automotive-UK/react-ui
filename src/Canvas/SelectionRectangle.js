import * as React from "react";

import { Box, alpha } from "@mui/material";

import PropTypes from "prop-types";

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
        backgroundColor: theme => alpha(theme.palette.primary.light, 0.1),
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

SelectionRectangle.propTypes = {
  /**
   * Height of the selection rectangle
   */
  height: PropTypes.number,
  /**
   * Left position of the selection rectangle
   * relative to the canvas
   */
  left: PropTypes.number,
  /**
   * Top position of the selection rectangle
   * relative to the canvas
   */
  top: PropTypes.number,
  /**
   * Width of the selection rectangle
   */
  width: PropTypes.number
};
