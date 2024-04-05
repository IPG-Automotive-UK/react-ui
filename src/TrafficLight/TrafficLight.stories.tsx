import { Layer, Stage } from "react-konva";
import { Meta, StoryFn } from "@storybook/react";
import React, { useRef } from "react";

import TrafficLight from "./TrafficLight";
import { TrafficLightProps } from "./TrafficLight.types";
import { useResizeObserver } from "usehooks-ts";

/**
 * Story metadata
 */
const meta: Meta<typeof TrafficLight> = {
  component: TrafficLight,
  title: "RoadView/TrafficLight"
};
export default meta;

// Story Template
const Template: StoryFn<TrafficLightProps> = args => {
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
          <TrafficLight {...args} />
        </Layer>
      </Stage>
    </div>
  );
};

// Default
export const Default = {
  args: {
    points: [1, 1]
  },
  render: Template
};

// With States
export const WithStates = {
  args: {
    points: [1, 1],
    state: 1
  },
  render: Template
};

// With Rotation
export const WithRotation = {
  args: {
    angle: 90,
    points: [5, 1]
  },
  render: Template
};

// Traffic Light Types
export const TrafficLightTypes = {
  args: {
    angle: 0,
    points: [1, 1],
    type: "red-yellow-green-straight"
  },
  render: Template
};
