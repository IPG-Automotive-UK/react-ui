import { Box, Typography } from "@mui/material";
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

// Basic LinePlot Template
const Template: StoryFn<LinePlotProps> = args => {
  return <LinePlot {...args} />;
};

// LinePlot wrapped in a Card, which represents one of our usecases in VIRTO
const CardTemplate: StoryFn<LinePlotProps> = args => {
  return (
    <Box
      sx={theme => ({
        alignItems: "flex-start",
        background: "#1e1e1e",
        border: "none",
        borderRadius: "6px",
        display: "flex",
        flexDirection: "column",
        height: "332px",
        padding: "24px",
        width: "800px",
        ...theme.applyStyles("light", {
          background: "white",
          border: `1px solid ${theme.palette.divider}`
        })
      })}
    >
      <Typography sx={{ fontSize: "20px", fontWeight: 500 }} color="primary">
        {args.title}
      </Typography>
      <LinePlot {...args} />
    </Box>
  );
};

// Default
export const Default = {
  args: {
    fullscreenTitle: "",
    showGrid: true,
    showMarkers: true,
    title: "",
    xdata: [0, 1, 2, 3, 4, 5],
    xlabel: "X label (rad)",
    ydata: [0, 20, 30, 40, 50],
    ylabel: "Y label (Nm)"
  },
  render: Template
};

// Inside a Card
export const InsideACard = {
  args: {
    fullscreenTitle: "A plot in fullscreen mode",
    showGrid: true,
    showMarkers: true,
    title: "",
    xdata: [0, 1, 2, 3, 4, 5],
    xlabel: "X label (rad)",
    ydata: [0, 1, 200, 3000, 40000, 50000],
    ylabel: "Y label (Nm)"
  },
  render: CardTemplate
};

// Scientific Notation
export const ScientificNotation = {
  args: {
    fullscreenTitle: "A plot in fullscreen mode",
    showGrid: true,
    showMarkers: true,
    title: "Scientific Notation",
    xdata: [0, 0.0001, 0.0002, 0.0003, 0.0004, 0.0005],
    xlabel: "X label (rad)",
    ydata: [0, 1, 200, 3000, 40000, 50000],
    ylabel: "Y label (Nm)"
  },
  render: Template
};
