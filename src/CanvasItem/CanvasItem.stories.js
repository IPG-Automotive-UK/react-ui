import { Box } from "@mui/material";
import CanvasItem from "./CanvasItem";
import React from "react";

export default {
  component: CanvasItem,
  title: "Canvas/CanvasItem"
};

const Template = args => {
  const [rectangle, setRectangle] = React.useState({
    height: 200,
    left: 100,
    top: 100,
    rotateAngle: 0,
    width: 200
  });
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
  return (
    <CanvasItem
      {...args}
      {...rectangle}
      onResize={onResize}
      onRotate={onRotate}
    >
      <Box sx={{ background: "grey" }}></Box>
    </CanvasItem>
  );
};

export const Default = Template.bind({});
Default.args = {
  zoomable: "n, ne, e, se, s, sw, w, nw"
};
