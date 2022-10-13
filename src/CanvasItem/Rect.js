import * as React from "react";

import { getAngle, getLength } from "./utils";

import { Box } from "@mui/material";
import PropTypes from "prop-types";
import ResizeHandle from "./ResizeHandle";
import RotateHandle from "./RotateHandle";

export default function Rect({
  children,
  onClick,
  onDrag,
  onResize,
  onRotate,
  selected,
  styles: {
    position: { centerX, centerY },
    size: { height, width },
    transform: { rotateAngle }
  },
  zoomable
}) {
  // ref to the element
  const ref = React.useRef();

  // track whether the mouse is down
  const isMouseDown = React.useRef(false);

  /**
   * Callback for when the mouse is pressed down on the rotate handle. Initializes the rotation.
   * @param {React.MouseEvent} e Mouse event
   */
  const startRotate = e => {
    // only accept left clicks
    if (e.button !== 0) return;

    // dont propagate event
    e.stopPropagation();

    // get mouse position
    const { clientX, clientY } = e;

    // get the current rectangle layout
    const rect = ref.current.getBoundingClientRect();
    const startAngle = rotateAngle;

    // get the center of the rectangle
    const center = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };

    // ge the mouse move vector
    const startVector = {
      x: clientX - center.x,
      y: clientY - center.y
    };

    // mouse is down
    isMouseDown.current = true;

    /**
     * Callback for mouse move. Calculates the new rotation angle and calls the user callback.
     * @param {React.MouseEvent} e Mouse event
     */
    const onMove = e => {
      // abort if mouse is not down
      if (!isMouseDown.current) return; // patch: fix windows press win key during mouseup issue

      // stop event propagation
      e.stopPropagation();

      // get the mouse move vector
      const { clientX, clientY } = e;
      const rotateVector = {
        x: clientX - center.x,
        y: clientY - center.y
      };

      // calculate the new rotation angle
      const angle = getAngle(startVector, rotateVector);

      // call user callback
      onRotate(angle, startAngle);
    };

    /**
     * Callback for mouse up. Stops listening for mouse move events.
     */
    const onUp = () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      if (!isMouseDown.current) return;
      isMouseDown.current = false;
    };

    // add mouse move and mouse up listeners
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  /**
   * Callback for when the mouse is pressed down on the resize handle. Initializes the resize.
   * @param {React.MouseEvent} e Mouse event
   * @param {string} cursor Cursor type to add to document
   * @param {string} type Resize handle type
   */
  const startResize = (e, cursor, type) => {
    // set the cursor to the document
    document.body.style.cursor = cursor;

    // stop event propagation
    e.stopPropagation();

    // get mouse start position
    const { clientX: startX, clientY: startY } = e;

    // define the start rectangle layout
    const rect = {
      centerX,
      centerY,
      height,
      rotateAngle,
      width
    };

    // track whether the mouse is down
    isMouseDown.current = true;

    /**
     * Callback for mouse move. Calculates the new rectangle layout and calls the user callback.
     * @param {React.MouseEvent} e Mouse event
     */
    const onMove = e => {
      // abort if mouse is not down
      if (!isMouseDown.current) return; // patch: fix windows press win key during mouseup issue

      // stop event propagation
      e.stopPropagation();

      // calculate angle and distance of mouse movement
      const { clientX, clientY } = e;
      const deltaX = clientX - startX;
      const deltaY = clientY - startY;
      const alpha = Math.atan2(deltaY, deltaX);
      const deltaL = getLength(deltaX, deltaY);

      // is shift key down?
      const isShiftKey = e.shiftKey;

      // call user callback
      onResize(deltaL, alpha, rect, type, isShiftKey);
    };

    /**
     * Callback for mouse up. Stops listening for mouse move events.
     */
    const onUp = () => {
      // return cursor to default
      document.body.style.cursor = "auto";

      // remove mouse move and mouse up listeners
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);

      // reset mouse down state
      if (!isMouseDown.current) return;
      isMouseDown.current = false;
    };

    // add mouse move and mouse up listeners
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  /**
   * Callback for when the mouse is pressed down on the rectangle. Initializes the drag.
   * @param {React.MouseEvent} e Mouse event
   */
  const startDrag = e => {
    // get mouse start position
    const { clientX: startX, clientY: startY } = e;
    const startCenterX = centerX;
    const startCenterY = centerY;

    // track whether the mouse is down
    isMouseDown.current = true;

    // stop event propagation
    e.stopPropagation();

    /**
     * Callback for mouse move. Calculates the new rectangle center coordinates and calls the user callback.
     * @param {React.MouseEvent} e Mouse event
     */
    const onMove = e => {
      // abort if mouse is not down
      if (!isMouseDown.current) return; // patch: fix windows press win key during mouseup issue

      // stop event propagation
      e.stopPropagation();

      // calculate the new center coordinates
      const { clientX, clientY } = e;
      const deltaX = clientX - startX;
      const deltaY = clientY - startY;
      const newCenterX = startCenterX + deltaX;
      const newCenterY = startCenterY + deltaY;

      // call user callback
      onDrag(newCenterX, newCenterY);
    };

    /**
     * Callback for mouse up. Stops listening for mouse move events.
     */
    const onUp = () => {
      // remove mouse move and mouse up listeners
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);

      // reset mouse down state
      if (!isMouseDown.current) return;
      isMouseDown.current = false;
    };

    // add mouse move and mouse up listeners
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  // convert the singel string format to array of resize handle types
  const direction = zoomable
    .split(",")
    .map(d => d.trim())
    .filter(d => d); // TODO: may be speed up

  return (
    <Box
      ref={ref}
      sx={{
        " .rotate": {
          cursor: "pointer",
          display: "flex",
          height: "18px",
          justifyContent: "center",
          left: "50%",
          marginLeft: "-9px",
          position: "absolute",
          top: "-26px",
          width: "18px"
        },
        border: theme =>
          selected ? `1px solid ${theme.palette.primary.main}` : 0,
        height: `${Math.abs(height)}px`,
        left: `${centerX - Math.abs(width) / 2}px`,
        position: "absolute",
        top: `${centerY - Math.abs(height) / 2}px`,
        transform: `rotate(${rotateAngle}deg)`,
        width: `${Math.abs(width)}px`
      }}
      onMouseDown={startDrag}
      onClick={onClick}
    >
      {children}
      {selected && onRotate && <RotateHandle onRotate={startRotate} />}
      {selected &&
        direction.map(d => {
          return (
            <ResizeHandle
              key={d}
              direction={d}
              onResize={startResize}
              rotateAngle={rotateAngle}
            />
          );
        })}
    </Box>
  );
}

Rect.propTypes = {
  /**
   * Callback for rectangle click
   */
  onClick: PropTypes.func,
  /**
   * Callback for rectangle resize
   */
  onResize: PropTypes.func,
  /**
   * Callback for rectangle rotation
   */
  onRotate: PropTypes.func,
  /**
   * Styles object
   */
  styles: PropTypes.object,
  /**
   * Comma separated list of resize handles to show
   */
  zoomable: PropTypes.string
};
