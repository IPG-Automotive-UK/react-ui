import * as React from "react";

import { centerToTL, degToRadian, getNewStyle, tLToCenter } from "./utils";

import Rect from "./Rect";

/**
 * CanvasItem is a component that can be used for as part of a drawing application. It includes features such as resize, rotate, and drag.
 */
export default function CanvasItem({
  top,
  left,
  width,
  height,
  minHeight = 30,
  minWidth = 30,
  rotateAngle = 0,
  resizeDirection = [],
  onRotate,
  onResize,
  onDrag,
  onClick,
  aspectRatio,
  children,
  selected,
  zIndex = 0
}) {
  /**
   * Callback for item being rotated. Handles snapping to major angles within 4 degrees, and normalizes angle to be between 0 and 360.
   * @param {number} angle Delta angle in degrees from the original rotation angle
   * @param {number} startAngle Original rotation angle
   */
  const handleRotate = (angle, startAngle) => {
    // return if no callback
    if (!onRotate) return;

    // normalize angle to be between 0 and 360
    let rotateAngle = Math.round(startAngle + angle);
    if (rotateAngle >= 360) {
      rotateAngle -= 360;
    } else if (rotateAngle < 0) {
      rotateAngle += 360;
    }

    // snap to major angles within 4 degrees
    if (rotateAngle > 356 || rotateAngle < 4) {
      rotateAngle = 0;
    } else if (rotateAngle > 86 && rotateAngle < 94) {
      rotateAngle = 90;
    } else if (rotateAngle > 176 && rotateAngle < 184) {
      rotateAngle = 180;
    } else if (rotateAngle > 266 && rotateAngle < 274) {
      rotateAngle = 270;
    }

    // call callback
    onRotate(rotateAngle);
  };

  /**
   * Callback for item being resized. Converts user input to a top/left origin rectangle and calls user callback.
   * @param {number} length Distance of the user mouse movement
   * @param {number} alpha Angle of the users mouse movement
   * @param {object} rect Original rectangle
   * @param {string} type Resize handle type
   * @param {boolean} isShiftKey Is the shift key pressed
   * @returns
   */
  const handleResize = (length, alpha, rect, type, isShiftKey) => {
    // return if no callback
    if (!onResize) return;

    // apply resize handle drag changes to the item rectangle
    const beta = alpha - degToRadian(rotateAngle);
    const deltaW = length * Math.cos(beta);
    const deltaH = length * Math.sin(beta);
    const ratio =
      isShiftKey && !aspectRatio ? rect.width / rect.height : aspectRatio;
    const {
      position: { centerX, centerY },
      size: { width, height }
    } = getNewStyle(
      type,
      { ...rect, rotateAngle },
      deltaW,
      deltaH,
      ratio,
      minWidth,
      minHeight
    );

    // call callback with top/left origin rectangle
    onResize(
      centerToTL({
        centerX,
        centerY,
        height,
        rotateAngle,
        width
      }),
      isShiftKey,
      type
    );
  };

  /**
   * Callback for item being dragged. Converts user input to a top/left origin rectangle and calls user callback.
   * @param {number} centerX New center x coordinate
   * @param {number} centerY New center y coordinate
   */
  const handleDrag = (centerX, centerY) => {
    const { top, left } = centerToTL({
      centerX,
      centerY,
      height,
      rotateAngle,
      width
    });
    onDrag && onDrag(top, left);
  };

  // convert top/left origin rectangle to center origin rectangle. it makes the math easier
  const styles = tLToCenter({
    height,
    left,
    rotateAngle,
    top,
    width
  });

  return (
    <Rect
      selected={selected}
      styles={styles}
      resizeDirection={resizeDirection}
      rotatable={Boolean(onRotate)}
      onResize={handleResize}
      onRotate={handleRotate}
      onDrag={handleDrag}
      onClick={onClick}
      zIndex={zIndex}
    >
      {children}
    </Rect>
  );
}
