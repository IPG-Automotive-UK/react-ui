import React, { useEffect } from "react";

import Canvas from "./Canvas";
import { action } from "@storybook/addon-actions";

export default {
  component: Canvas,
  title: "Canvas/Canvas"
};

const TemplateWithState = args => {
  const [width, setWidth] = React.useState(args.width ?? 500);
  const [height, setHeight] = React.useState(args.width ?? 500);
  useEffect(() => setWidth(args.width), [args.width]);
  useEffect(() => setHeight(args.height), [args.height]);
  const onResize = (width, height) => {
    action("onResize")(width, height);
    setWidth(width);
    setHeight(height);
  };
  return (
    <Canvas
      {...args}
      height={height}
      width={width}
      onResize={onResize}
      onSelectionRectangle={action("onSelectionRectangle")}
    />
  );
};

const TemplateWithoutState = args => {
  return <Canvas {...args} />;
};

const defaultArgs = {
  backgroundColor: "#ffffff",
  backgroundImage: "",
  gridColor: "rgba(0, 0, 0, 0.1)",
  gridSize: 25,
  height: 500,
  minHeight: 100,
  minWidth: 100,
  onMouseDown: action("onMouseDown"),
  onResize: action("onResize"),
  onSelectionRectangle: action("onSelectionRectangle"),
  showBorder: true,
  showGrid: true,
  tabIndex: 0,
  width: 500
};

export const Default = {
  args: defaultArgs,
  render: TemplateWithState
};

export const Interactive = {
  args: defaultArgs,
  render: TemplateWithState
};

export const Viewer = {
  args: {
    ...defaultArgs,
    grid: false,
    onMouseDown: undefined,
    onResize: undefined,
    onSelectionRectangle: undefined
  },

  render: TemplateWithoutState
};
