import Canvas from "./Canvas";
import React from "react";

export default {
  component: Canvas,
  title: "Canvas/Canvas"
};

const Template = args => {
  const [width, setWidth] = React.useState(500);
  const [height, setHeight] = React.useState(500);
  const onResize = (newWidth, newHeight) => {
    setWidth(newWidth);
    setHeight(newHeight);
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
