import React, { useEffect } from "react";

import { Box } from "@mui/material";
import CanvasItem from "./CanvasItem";
import { action } from "@storybook/addon-actions";

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
    action("onChange")(style, isShiftKey, type);
  };
  const onRotate = rotateAngle => {
    setRectangle(previous => ({
      ...previous,
      rotateAngle
    }));
    action("onRotate")(rotateAngle);
  };
  const onDrag = (top, left) => {
    setRectangle(previous => ({
      ...previous,
      left,
      top
    }));
    action("onDrag")(top, left);
  };
  const onClick = e => {
    e.stopPropagation();
    setSelected(true);
    action("onClick")(e);
  };
  return (
    <Box width="100%" height="100%" onClick={() => setSelected(false)}>
      <CanvasItem
        {...args}
        {...rectangle}
        onResize={onResize}
        onRotate={onRotate}
        onDrag={onDrag}
        selected={selected}
        onClick={onClick}
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
