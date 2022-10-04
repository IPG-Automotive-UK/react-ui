import * as React from "react";

import { getAngle, getLength } from "./utils";

import { Box } from "@mui/material";
import PropTypes from "prop-types";
import ResizeHandle from "./ResizeHandle";
import RotateHandle from "./RotateHandle";

export default function Rect({
  children,
  rotatable,
  styles: {
    position: { centerX, centerY },
    size: { height, width },
    transform: { rotateAngle }
  },
  zoomable,
  onDrag,
  onRotate,
  onResize,
  selected,
  onMouseDown
}) {
  const ref = React.useRef();
  const isMouseDown = React.useRef(false);

  // Rotate
  const startRotate = e => {
    if (e.button !== 0) return;
    const { clientX, clientY } = e;
    const rect = ref.current.getBoundingClientRect();
    const startAngle = rotateAngle;
    const center = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
    const startVector = {
      x: clientX - center.x,
      y: clientY - center.y
    };
    isMouseDown.current = true;
    const onMove = e => {
      if (!isMouseDown.current) return; // patch: fix windows press win key during mouseup issue
      e.stopImmediatePropagation();
      const { clientX, clientY } = e;
      const rotateVector = {
        x: clientX - center.x,
        y: clientY - center.y
      };
      const angle = getAngle(startVector, rotateVector);
      onRotate(angle, startAngle);
    };
    const onUp = () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      if (!isMouseDown.current) return;
      isMouseDown.current = false;
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  // Resize
  const startResize = (e, cursor, type) => {
    document.body.style.cursor = cursor;
    const { clientX: startX, clientY: startY } = e;
    const rect = {
      centerX,
      centerY,
      height,
      rotateAngle,
      width
    };
    isMouseDown.current = true;
    const onMove = e => {
      if (!isMouseDown.current) return; // patch: fix windows press win key during mouseup issue
      e.stopImmediatePropagation();
      const { clientX, clientY } = e;
      const deltaX = clientX - startX;
      const deltaY = clientY - startY;
      const alpha = Math.atan2(deltaY, deltaX);
      const deltaL = getLength(deltaX, deltaY);
      const isShiftKey = e.shiftKey;
      console.log(deltaX, deltaY);
      console.log(type);
      onResize(deltaL, alpha, rect, type, isShiftKey);
    };

    const onUp = () => {
      document.body.style.cursor = "auto";
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      if (!isMouseDown.current) return;
      isMouseDown.current = false;
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  const startDrag = e => {
    let { clientX: startX, clientY: startY } = e;
    isMouseDown.current = true;
    e.stopPropagation();
    onMouseDown(e);
    const onMove = e => {
      if (!isMouseDown.current) return; // patch: fix windows press win key during mouseup issue
      e.stopPropagation();
      const { clientX, clientY } = e;
      const deltaX = clientX - startX;
      const deltaY = clientY - startY;
      onDrag(deltaX, deltaY);
      startX = clientX;
      startY = clientY;
    };
    const onUp = () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      if (!isMouseDown.current) return;
      isMouseDown.current = false;
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

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
        height: Math.abs(height),
        left: centerX - Math.abs(width) / 2,
        position: "absolute",
        top: centerY - Math.abs(height) / 2,
        transform: `rotate(${rotateAngle}deg)`,
        width: Math.abs(width)
      }}
      onMouseDown={startDrag}
    >
      {children}
      {selected && rotatable && <RotateHandle onRotate={startRotate} />}
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
  onResize: PropTypes.func,
  onResizeEnd: PropTypes.func,
  onResizeStart: PropTypes.func,
  onRotate: PropTypes.func,
  onRotateEnd: PropTypes.func,
  onRotateStart: PropTypes.func,
  parentRotateAngle: PropTypes.number,
  rotatable: PropTypes.bool,
  styles: PropTypes.object,
  zoomable: PropTypes.string
};
