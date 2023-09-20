import * as React from "react";

import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { getCursor } from "./utils";

/**
 * Resize handle for a given location on a rectangle (corner or side defined by a compass direction).
 */
export default function ResizeHandle({ onResize, direction, rotateAngle }) {
  // get cursor type for direction
  const cursor = getCursor(rotateAngle, direction);

  // callback for resize
  const handleResize = React.useCallback(
    event => {
      onResize(event, cursor, direction);
    },
    [onResize, cursor, direction]
  );

  // get the resize handle position styles
  const getOffset = direction => {
    const offset = "-5px";
    const center = "calc(50% - 5px)";
    switch (direction) {
      case "n":
        return {
          left: "50%",
          marginLeft: offset,
          top: offset
        };
      case "ne":
        return {
          right: offset,
          top: offset
        };
      case "e":
        return {
          right: offset,
          top: center
        };
      case "se":
        return {
          bottom: offset,
          right: offset
        };
      case "s":
        return {
          bottom: offset,
          left: center
        };
      case "sw":
        return {
          bottom: offset,
          left: offset
        };
      case "w":
        return {
          left: offset,
          top: center
        };
      case "nw":
        return {
          left: offset,
          top: offset
        };
      default:
        return {};
    }
  };

  return (
    <Box
      sx={{
        background: theme => theme.palette.primary.main,
        cursor: `${cursor}-resize`,
        height: "10px",
        outline: theme => `2px solid ${theme.palette.background.paper}`,
        position: "absolute",
        width: "10px",
        ...getOffset(direction)
      }}
      onMouseDown={handleResize}
      onDragStart={e => e.preventDefault()}
      onDrag={e => e.preventDefault()}
    />
  );
}

ResizeHandle.propTypes = {
  /**
   * Compass direction for the resize handle
   */
  direction: PropTypes.oneOf(["n", "ne", "e", "se", "s", "sw", "w", "nw"]),
  /**
   * Callback for resize
   */
  onResize: PropTypes.func,
  /**
   * Rotation angle of the canvas
   * (used to determine the cursor type)
   */
  rotateAngle: PropTypes.number
};
