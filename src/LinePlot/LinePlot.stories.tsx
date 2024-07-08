import { Meta, StoryFn } from "@storybook/react";

import LinePlot from "./LinePlot";
import { LinePlotProps } from "./LinePlot.types";
import React from "react";

/**
 * Story metadata
 */
const meta: Meta<typeof LinePlot> = {
  component: LinePlot,
  title: "Plots/LinePlot"
};
export default meta;

// Story Template
const Template: StoryFn<LinePlotProps> = args => {
  return <LinePlot {...args} />;
};

// Default
export const Default = {
  args: {
    showGrid: true,
    showMarkers: true,
    showTitle: false,
    title: "",
    xdata: [0, 1, 2, 3, 4, 5],
    xlabel: "X label (rad)",
    ydata: [0, 20, 30, 40, 50],
    ylabel: "Y label (-)"
  },
  render: Template
};
