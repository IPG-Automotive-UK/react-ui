import * as React from "react";

import { Box } from "@mui/material";
import { getCursor } from "./utils";

export default function ResizeHandle({
  sx,
  onResize,
  direction,
  rotateAngle,
  ...props
}) {
  const cursor = getCursor(rotateAngle, direction);
  const handleResize = React.useCallback(
    event => {
      onResize(event, cursor, direction);
    },
    [onResize, cursor]
  );
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
      sx={[
        {
          background: theme => theme.palette.primary.main,
          cursor: `${cursor}-resize`,
          height: "10px",
          outline: theme => `2px solid ${theme.palette.background.paper}`,
          position: "absolute",
          width: "10px",
          ...getOffset(direction)
        },
        ...(Array.isArray(sx) ? sx : [sx])
      ]}
      {...props}
      onMouseDown={handleResize}
      onDragStart={e => e.preventDefault()}
      onDrag={e => e.preventDefault()}
    />
  );
}
