import React, { useEffect } from "react";

import { Box } from "@mui/material";
import CanvasItem from "./CanvasItem";

export default {
  component: CanvasItem,
  title: "Canvas/CanvasItem"
};

const Template = args => {
  const [rectangle, setRectangle] = React.useState({
    height: 200,
    left: 100,
    rotateAngle: 0,
    top: 100,
    width: 200
  });
  const [selected, setSelected] = React.useState(args.selected);
  useEffect(() => {
    setSelected(args.selected);
  }, [args.selected]);
  const onResize = (style, isShiftKey, type) => {
    let { top, left, width, height } = style;
    top = Math.round(top);
    left = Math.round(left);
    width = Math.round(width);
    height = Math.round(height);
    setRectangle(previous => ({
      ...previous,
      height,
      left,
      top,
      width
    }));
  };
  const onRotate = rotateAngle => {
    setRectangle(previous => ({
      ...previous,
      rotateAngle
    }));
  };
  const onDrag = (deltaX, deltaY) => {
    setRectangle(previous => ({
      ...previous,
      left: previous.left + deltaX,
      top: previous.top + deltaY
    }));
  };
  const onMouseDown = e => setSelected(true);
  return (
    <Box width="100%" height="100%" onMouseDown={() => setSelected(false)}>
      <CanvasItem
        {...args}
        {...rectangle}
        onResize={onResize}
        onRotate={onRotate}
        onDrag={onDrag}
        selected={selected}
        onMouseDown={onMouseDown}
      >
        <Box
          sx={{ background: theme => theme.palette.grey[100] }}
          width="100%"
          height="100%"
        ></Box>
      </CanvasItem>
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {
  zoomable: "n, ne, e, se, s, sw, w, nw"
};
