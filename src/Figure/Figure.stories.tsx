import { Layer, Stage } from "react-konva";
import { Meta, StoryFn } from "@storybook/react";
import React, { useRef } from "react";

import Figure from "./Figure";
import { FigureProps } from "./Figure.types";
import ImageURL from "./figureExampleSvg.svg";
import { useResizeObserver } from "usehooks-ts";

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
  const stageParent = useRef(null);

  const { width = 0, height = 0 } = useResizeObserver({
    box: "border-box",
    ref: stageParent
  });
  // todo what size to render the stage? Should it be hardcoded?
  return (
    <div
      ref={stageParent}
      id="StageParent"
      style={{ height: "100vh", width: "100vw" }}
    >
      <Stage
        width={width}
        height={height}
        scale={{ x: 12, y: -12 }}
        x={0}
        y={0}
      >
        <Layer scaleY={-1}>
          <Figure {...args} />
        </Layer>
      </Stage>
    </div>
  );
};

// Default
export const Default = {
  args: {
    url: ImageURL,
    x: 10,
    y: 10
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
    x: 10,
    y: 10
  },
  render: Template
};

// Variable scale (aspect ratio fixed)
export const VariableScale = {
  args: {
    scale: 10,
    url: ImageURL,
    x: 10,
    y: 10
  },
  render: Template
};
