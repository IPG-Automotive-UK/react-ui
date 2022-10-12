import * as React from "react";

import { Box } from "@mui/material";
import Grid from "./Grid";
import PropTypes from "prop-types";
import ResizeHandle from "./ResizeHandle";
import SelectionRectangle from "./SelectionRectangle";
import useSelectionRectangle from "./useSelectionRectangle";

/**
 * A canvas component that can be used for as part of a drawing application. It includes features such as resize, grid, and selection rectangle.
 */
const Canvas = React.forwardRef(
  (
    {
      backgroundColor = "white",
      backgroundImage = "",
      children,
      gridColor = "rgba(0, 0, 0, 0.1)",
      gridSize = 25,
      height = 500,
      minHeight = 100,
      minWidth = 100,
      onResize,
      onSelectionRectangle,
      resizable = true,
      width = 500,
      showBorder = true,
      showGrid = true,
      onMouseDown,
      tabIndex,
      ...boxProps
    },
    ref
  ) => {
    // selection rectangle logic
    const [isSelecting, rectangle, startSelection] = useSelectionRectangle(
      onSelectionRectangle,
      {
        maxHeight: Math.max(height, minHeight),
        maxWidth: Math.max(width, minWidth)
      }
    );

    /**
     * Callback for mouse down on the canvas. Handles user callback and selection rectangle.
     * @param {React.MouseEvent} e Mouse event
     */
    const handleMouseDown = e => {
      onMouseDown && onMouseDown(e);
      startSelection(e);
    };

    /**
     * Callback for canvas being resized. Applies limits and calls user callback.
     * @param {number} width Proposed new width
     * @param {number} height Proposed new height
     */
    const handleResize = (width, height) => {
      width = Math.max(width, minWidth);
      height = Math.max(height, minHeight);
      onResize(width, height);
    };

    return (
      <Box
        sx={{
          backgroundColor,
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: `${width}px ${height}px`,
          border: showBorder ? `1px solid ${gridColor}` : "none",
          height: `${height}px`,
          minHeight,
          minWidth,
          outline: "none",
          position: "relative",
          width: `${width}px`
        }}
        onMouseDown={handleMouseDown}
        {...boxProps}
        tabIndex={tabIndex}
        ref={ref}
        id="canvas"
      >
        {showGrid && <Grid size={gridSize} color={gridColor} />}
        {children}
        {isSelecting && <SelectionRectangle {...rectangle} />}
        {onResize && (
          <ResizeHandle
            onResize={handleResize}
            canvasSize={{
              height,
              width
            }}
          />
        )}
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
   * Callback function to be called on key down
   *
   * **Signature**
   *
   * ```
   * function(event: React.KeyboardEvent<HTMLDivElement>) => void
   * ```
   *
   * event: The event source of the callback.
   */
  onKeyDown: PropTypes.func,
  /**
   * Callback function to be called on mouse down
   *
   * **Signature**
   *
   * ```
   * function(event: React.MouseEvent<HTMLDivElement>) => void
   * ```
   *
   * event: The event source of the callback.
   */
  onMouseDown: PropTypes.func,
  /**
   * Callback function to be called when the canvas is resized
   *
   * **Signature**
   *
   * ```
   * function(newWidth: number, newHeight:number) => void
   * ```
   *
   * newWidth: The new width of the canvas
   *
   * newHeight: The new height of the canvas
   */
  onResize: PropTypes.func,
  /**
   * Callback function to be called when the user is selecting via rectangle
   *
   * **Signature**
   *
   * ```
   * function({top: number, left: number, width:number, height:number}) => void
   * ```
   *
   * top: Top position of the selection rectangle
   *
   * left: Left position of the selection rectangle
   *
   * width: Width of the selection rectangle
   *
   * height: Height of the selection rectangle
   */
  onSelectionRectangle: PropTypes.func,
  /**
   * Reference to the canvas
   */
  ref: PropTypes.func,
  /**
   * Show a border around the canvas
   */
  showBorder: PropTypes.bool,
  /**
   * Show a grid on the canvas
   */
  showGrid: PropTypes.bool,
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
