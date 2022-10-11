import * as React from "react";

import { centerToTL, degToRadian, getNewStyle, tLToCenter } from "./utils";

import PropTypes from "prop-types";
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
  rotatable = true,
  rotateAngle = 0,
  zoomable = "",
  onRotate,
  onResize,
  onDrag,
  onClick,
  aspectRatio,
  children,
  selected
}) {
  const handleRotate = (angle, startAngle) => {
    if (!onRotate) return;
    let rotateAngle = Math.round(startAngle + angle);
    if (rotateAngle >= 360) {
      rotateAngle -= 360;
    } else if (rotateAngle < 0) {
      rotateAngle += 360;
    }
    if (rotateAngle > 356 || rotateAngle < 4) {
      rotateAngle = 0;
    } else if (rotateAngle > 86 && rotateAngle < 94) {
      rotateAngle = 90;
    } else if (rotateAngle > 176 && rotateAngle < 184) {
      rotateAngle = 180;
    } else if (rotateAngle > 266 && rotateAngle < 274) {
      rotateAngle = 270;
    }
    onRotate(rotateAngle);
  };

  const handleResize = (length, alpha, rect, type, isShiftKey) => {
    if (!onResize) return;
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
      zoomable={zoomable}
      rotatable={Boolean(rotatable && onRotate)}
      onResize={handleResize}
      onRotate={handleRotate}
      onDrag={handleDrag}
      onClick={onClick}
    >
      {children}
    </Rect>
  );
}

CanvasItem.propTypes = {
  /**
   * Aspect ratio of the item. If set, the item will be resized to keep the aspect ratio when resizing. If not set, the item will be resized freely.
   */
  aspectRatio: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),

  /**
   * The height of the item.
   */
  height: PropTypes.number.isRequired,

  /**
   * The left position of the item.
   */
  left: PropTypes.number.isRequired,

  /**
   * The minimum height of the item.
   */
  minHeight: PropTypes.number,
  /**
   * The minimum width of the item.
   */
  minWidth: PropTypes.number,
  /**
   * Callback function when the item is clicked.
   *
   * **Signature**
   *
   * ```
   * function(event: ReactMouseEvent<HTMLDivElement>) => void
   * ```
   * event: The event source of the callback.
   */
  onClick: PropTypes.func,
  /**
   * Callback function when the item is dragged.
   *
   * **Signature**
   *
   * ```
   * function(top: number, left: number) => void
   * ```
   *
   * top: The new top position of the item.
   *
   * left: The new left position of the item.
   */
  onDrag: PropTypes.func,
  /**
   * Callback function when the item is resized.
   *
   * **Signature**
   * ```
   * function({top: number, left: number, width: number, height: number, rotateAngle: number}, isShiftKey: boolean, type: string) => void
   * ```
   *
   * top: The new top position of the item.
   *
   * left: The new left position of the item.
   *
   * width: The new width of the item.
   *
   * height: The new height of the item.
   *
   * rotateAngle: The new rotate angle of the item.
   *
   * isShiftKey: Whether the shift key is pressed.
   *
   * type: The type of the resize handle.
   */
  onResize: PropTypes.func,
  /**
   * Callback function when the item is rotated.
   *
   * **Signature**
   *
   * ```
   * function(rotateAngle: number) => void
   * ```
   *
   * rotateAngle: The new rotate angle of the item.
   */
  onRotate: PropTypes.func,
  /**
   * Defines whether the item can be rotated.
   */
  rotatable: PropTypes.bool,
  /**
   * The rotation angle of the item.
   */
  rotateAngle: PropTypes.number,
  /**
   * Defines whether the item is selected. When the item is selected, the resize and rotate handles will be shown.
   */
  selected: PropTypes.bool,
  /**
   * The top position of the item.
   */
  top: PropTypes.number.isRequired,
  /**
   * The width of the item.
   */
  width: PropTypes.number.isRequired,
  /**
   * The zoomable direction of the item. It can be any subset of "n, ne, e, se, s, sw, w, nw" and is provides as a comma delimited string.
   */
  zoomable: PropTypes.string
};
