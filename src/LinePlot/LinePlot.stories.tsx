import { Meta, StoryFn } from "@storybook/react";

import LinePlot from "./LinePlot";
import { LinePlotProps } from "./LinePlot.types";
import React from "react";
import { useArgs } from "@storybook/preview-api";

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
  // useArgs is a hook that returns the current state of the args object
  const [{ markers }, updateArgs] = useArgs<LinePlotProps>();

  // update the args object with the new markers value
  React.useEffect(() => {
    updateArgs({ markers });
  }, [markers, updateArgs]);

  return <LinePlot {...args} />;
};

// Default
export const Default = {
  args: {
    markers: true,
    showGrid: true,
    showTitle: false,
    title: "",
    xdata: [0, 1, 2, 3, 4, 5],
    xlabel: "X label (rad)",
    ydata: [0, 20, 30, 40, 50],
    ylabel: "Y label (-)"
  },
  render: Template
};
