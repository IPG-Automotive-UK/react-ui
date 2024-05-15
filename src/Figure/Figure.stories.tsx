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
      <Layer ref={layerRef}>
        <Figure {...args} />
      </Layer>
    </Stage>
  );
};

// Default
export const Default = {
  args: {
    angle: 0,
    height: 3,
    onImageLoaded: () => ((window as any).imageLoaded = true),
    scale: 1,
    url: ImageURL,
    width: 3,
    x: 0,
    y: 0
  },
  render: Template
};

// Variable size (x and y independent)
export const VariableSize = {
  args: {
    angle: 0,
    height: 10,
    onImageLoaded: () => ((window as any).imageLoaded = true),
    scale: 1,
    url: ImageURL,
    width: 10,
    x: 0,
    y: 0
  },
  render: Template
};

// Variable scale (aspect ratio fixed)
export const VariableScale = {
  args: {
    angle: 0,
    height: 3,
    onImageLoaded: () => ((window as any).imageLoaded = true),
    scale: 10,
    url: ImageURL,
    width: 3,
    x: 0,
    y: 0
  },
  render: Template
};
