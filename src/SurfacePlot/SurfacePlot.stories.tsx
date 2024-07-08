import { Meta, StoryFn } from "@storybook/react";

import React from "react";
import SurfacePlot from "./SurfacePlot";
import { SurfacePlotProps } from "./SurfacePlot.types";

/**
 * Story metadata
 */
const meta: Meta = {
  component: SurfacePlot,
  title: "Plots/SurfacePlot"
};
export default meta;

// Story Template
const Template: StoryFn<SurfacePlotProps> = args => {
  // Render the SurfacePlot component with the current arguments
  return <SurfacePlot {...args} />;
};

// Define the default story
export const Default = {
  // Set the default values for the story's arguments
  args: {
    minHeight: 0,
    showGrid: true,
    title: "Surface Plot",
    xdata: [0.18, 0.36, 0.55, 0.73, 0.91, 1],
    xlabel: "Normalized Torque (-)",
    ydata: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    ylabel: "Normalized Rotational Speed (-)",
    zdata: [
      [0.76, 0.76, 0.72, 0.7, 0.65, 0.6],
      [0.86, 0.78, 0.76, 0.74, 0.7, 0.65],
      [0.9, 0.9, 0.88, 0.86, 0.86, 0.78],
      [0.92, 0.92, 0.92, 0.9, 0.88, 0.78],
      [0.92, 0.92, 0.92, 0.92, 0.7, 0.65],
      [0.92, 0.94, 0.94, 0.7, 0.65, 0.6],
      [0.92, 0.94, 0.94, 0.7, 0.65, 0.6],
      [0.92, 0.94, 0.7, 0.65, 0.6, 0.6],
      [0.92, 0.94, 0.7, 0.65, 0.6, 0.6],
      [0.92, 0.94, 0.7, 0.65, 0.6, 0.6],
      [0.92, 0.92, 0.7, 0.65, 0.6, 0.6]
    ],
    zlabel: "Efficiency (-)"
  },
  // Set the render function to use the story template
  render: Template
};
