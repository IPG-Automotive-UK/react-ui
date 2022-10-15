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
  useEffect(
    () => setRectangle(previous => ({ ...previous, top: args.top })),
    [args.top]
  );
  useEffect(
    () => setRectangle(previous => ({ ...previous, left: args.left })),
    [args.left]
  );
  useEffect(
    () => setRectangle(previous => ({ ...previous, width: args.width })),
    [args.width]
  );
  useEffect(
    () => setRectangle(previous => ({ ...previous, height: args.height })),
    [args.height]
  );
  useEffect(
    () =>
      setRectangle(previous => ({
        ...previous,
        rotateAngle: args.rotateAngle
      })),
    [args.rotateAngle]
  );

  const [selected, setSelected] = React.useState(args.selected);
  useEffect(() => setSelected(args.selected), [args.selected]);

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

  const onCanvasClick = e => {
    setSelected(false);
  };

  return (
    <Box width="100%" height="100%" onClick={onCanvasClick}>
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

const defaultArgs = {
  height: 200,
  left: 100,
  minHeight: 30,
  minWidth: 30,
  onClick: action("onClick"),
  onDrag: action("onDrag"),
  onResize: action("onResize"),
  onRotate: action("onRotate"),
  resizeDirection: ["nw", "n", "ne", "e", "se", "s", "sw", "w"],
  rotateAngle: 0,
  selected: false,
  top: 100,
  width: 200
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs
};
