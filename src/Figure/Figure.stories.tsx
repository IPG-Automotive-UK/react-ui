import { Layer, Stage } from "react-konva";
import { Meta, StoryFn } from "@storybook/react";
import React, { useRef } from "react";

import Figure from "./Figure";
import { FigureProps } from "./Figure.types";
import ImageURL from "./figureExampleSvg.svg";
import Konva from "konva";

/**
 * Story metadata
 */
const meta: Meta<typeof Figure> = {
  component: Figure,
  title: "RoadView/Figure"
};
export default meta;

// Story Template
const Template: StoryFn<FigureProps> = args => {
  const layerRef = useRef<Konva.Layer>(null);
  return (
    <Stage width={200} height={200} scale={{ x: 10, y: -10 }} x={100} y={100}>
      <Layer ref={layerRef} scaleY={-1}>
        <Figure {...args} />
      </Layer>
    </Stage>
  );
};

// Default
export const Default = {
  args: {
    onImageLoad: loaded => console.log(loaded),
    url: ImageURL,
    x: 0,
    y: 0
  },
  render: Template
};

// Variable size (x and y independent)
export const VariableSize = {
  args: {
    size: {
      x: 10,
      y: 10
    },
    url: ImageURL,
    x: 0,
    y: 0
  },
  render: Template
};

// Variable scale (aspect ratio fixed)
export const VariableScale = {
  args: {
    scale: 10,
    url: ImageURL,
    x: 0,
    y: 0
  },
  render: Template
};
