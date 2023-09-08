import { Meta, StoryFn } from "@storybook/react";

import LinePlot from "./LinePlot";
import { LinePlotProps } from "./LinePlot.types";
import React from "react";
import { useArgs } from "@storybook/client-api";

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
    markers: false,
    showTitle: false,
    title: "",
    xdata: [1, 2, 3, 4, 5],
    xlabel: "X",
    ydata: [1, 2, 3, 4, 5],
    ylabel: "Y"
  },
  render: Template
};
