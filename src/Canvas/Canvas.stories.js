import Canvas from "./Canvas";
import React from "react";

export default {
  component: Canvas,
  title: "Canvas/Canvas"
};

const Template = args => {
  const [width, setWidth] = React.useState(500);
  const [height, setHeight] = React.useState(500);
  const onResize = (deltaX, deltaY) => {
    setWidth(previous => Math.max(args.minWidth || 0, previous + deltaX));
    setHeight(previous => Math.max(args.minHeight || 0, previous + deltaY));
  };
  return (
    <Canvas
      {...args}
      height={height}
      width={width}
      onResize={onResize}
      onSelectionRectangle={() => {}}
    />
  );
};

export const Default = Template.bind({});
Default.args = {};
