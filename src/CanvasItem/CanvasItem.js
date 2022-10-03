import * as React from "react";

import { centerToTL, degToRadian, getNewStyle, tLToCenter } from "./utils";

import PropTypes from "prop-types";
import Rect from "./Rect";

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
  aspectRatio,
  children
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

  const styles = tLToCenter({
    height,
    left,
    rotateAngle,
    top,
    width
  });

  return (
    <Rect
      styles={styles}
      zoomable={zoomable}
      rotatable={Boolean(rotatable && onRotate)}
      onResize={handleResize}
      onRotate={handleRotate}
    >
      {children}
    </Rect>
  );
}

CanvasItem.propTypes = {
  aspectRatio: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  height: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  minHeight: PropTypes.number,
  minWidth: PropTypes.number,
  onResize: PropTypes.func,
  onRotate: PropTypes.func,
  rotatable: PropTypes.bool,
  rotateAngle: PropTypes.number,
  top: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  zoomable: PropTypes.string
};
