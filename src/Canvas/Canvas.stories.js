import Canvas from "./Canvas";
import React from "react";

export default {
  component: Canvas,
  title: "Canvas/Canvas"
};

const TemplateWithState = args => {
  const [width, setWidth] = React.useState(500);
  const [height, setHeight] = React.useState(500);
  const onResize = (width, height) => {
    setWidth(width);
    setHeight(height);
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

const TemplateWithoutState = args => {
  return <Canvas {...args} />;
};

export const Interactive = TemplateWithState.bind({});
Interactive.args = {};

export const Viewer = TemplateWithoutState.bind({});
Viewer.args = {
  grid: false,
  onMouseDown: undefined,
  onResize: undefined,
  onSelectionRectangle: undefined
};
