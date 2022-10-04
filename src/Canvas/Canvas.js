import * as React from "react";

import { Box } from "@mui/material";
import Grid from "./Grid";
import PropTypes from "prop-types";
import ResizeHandle from "./ResizeHandle";
import SelectionRectangle from "./SelectionRectangle";
import useSelectionRectangle from "./useSelectionRectangle";

const Canvas = React.forwardRef(
  (
    {
      backgroundColor = "white",
      backgroundImage = "",
      border = true,
      children,
      grid = true,
      gridColor = "rgba(0, 0, 0, 0.1)",
      gridSize = 25,
      height = 500,
      minHeight = 100,
      minWidth = 100,
      onResize = () => {},
      onSelectionRectangle = () => {},
      resizeable = true,
      width = 500,
      sx = [],
      onMouseDown = () => {},
      ...boxProps
    },
    ref
  ) => {
    // selection rectangle
    const [isSelecting, rectangle, startSelection] = useSelectionRectangle(
      onSelectionRectangle,
      {
        maxHeight: Math.max(height, minHeight),
        maxWidth: Math.max(width, minWidth)
      }
    );

    const handleMouseDown = e => {
      onMouseDown(e);
      startSelection(e);
    };

    const handleResize = (width, height) => {
      width = Math.max(width, minWidth);
      height = Math.max(height, minHeight);
      onResize(width, height);
    };

    return (
      <Box
        sx={[
          {
            backgroundColor,
            backgroundImage: `url(${backgroundImage})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${width}px ${height}px`,
            border: border ? `1px solid ${gridColor}` : "none",
            height: `${height}px`,
            minHeight,
            minWidth,
            outline: "none",
            position: "relative",
            width: `${width}px`
          },
          ...(Array.isArray(sx) ? sx : [sx]) // combine user provided sx with default
        ]}
        onMouseDown={handleMouseDown}
        {...boxProps}
        ref={ref}
      >
        {grid && <Grid size={gridSize} color={gridColor} />}
        {children}
        {isSelecting && <SelectionRectangle {...rectangle} />}
        {resizeable && <ResizeHandle onResize={handleResize} />}
      </Box>
    );
  }
);

Canvas.displayName = "Canvas";

export default Canvas;

Canvas.propTypes = {
  /**
   * Background color of the canvas
   */
  backgroundColor: PropTypes.string,
  /**
   * Background image of the canvas
   */
  backgroundImage: PropTypes.string,
  /**
   * Show a border around the canvas
   */
  border: PropTypes.bool,
  /**
   * Child components to be rendered inside the canvas
   */
  children: PropTypes.node,
  /**
   * Show a grid on the canvas
   */
  grid: PropTypes.bool,
  /**
   * Color of the grid
   */
  gridColor: PropTypes.string,
  /**
   * Grid size in pixels
   */
  gridSize: PropTypes.number,
  /**
   * Height of the canvas
   */
  height: PropTypes.number,
  /**
   * Minimum height of the canvas
   */
  minHeight: PropTypes.number,
  /**
   * Minimum width of the canvas
   */
  minWidth: PropTypes.number,
  /**
   * Callback function to be called on key press
   */
  onKeyPress: PropTypes.func,
  /**
   * Callback function to be called on mouse down
   */
  onMouseDown: PropTypes.func,
  /**
   * Callback function to be called when the canvas is resized
   */
  onResize: PropTypes.func,
  /**
   * Callback function to be called when the user is selecting via rectangle
   */
  onSelectionRectangle: PropTypes.func,
  /**
   * Reference to the canvas
   */
  ref: PropTypes.func,
  /**
   * Is the canvas resizable
   */
  resizeable: PropTypes.bool,
  /**
   * Style object to be applied to the canvas
   */
  sx: PropTypes.object,
  /**
   * Tab index of the canvas
   */
  tabIndex: PropTypes.number,
  /**
   * Width of the canvas
   */
  width: PropTypes.number
};
