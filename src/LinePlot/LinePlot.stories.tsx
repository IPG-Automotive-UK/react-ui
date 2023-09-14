import { Box, IconButton, Typography } from "@mui/material";
import { Meta, StoryFn } from "@storybook/react";

import { DragIndicatorOutlined } from "@mui/icons-material";
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

const TemplateWithCard: StoryFn<LinePlotProps> = args => {
  return (
    <Box
      sx={{
        alignItems: "flex-start",
        border:
          "0.5px solid var(--light-other-outlined-border-23-p, rgba(0, 0, 0, 0.23))",
        borderRadius: "6px",
        boxShadow: "0px 0px 0px 1px #E0E0E0",
        display: "flex",
        flex: "1 0 0",
        flexDirection: "column",
        gap: "24px",
        height: "332px",
        maxWidth: "900px",
        minWidth: "500px"
      }}
    >
      <Box
        sx={{ alignItems: "center", display: "flex", padding: "24px", pb: 0 }}
      >
        <IconButton>
          <DragIndicatorOutlined color="primary" />
        </IconButton>
        <Typography sx={{ fontSize: "20px", fontWeight: 500 }} color="primary">
          Testing with Manjesh
        </Typography>
      </Box>
      <Box sx={{ height: "100%", width: "100%" }}>
        <LinePlot {...args} />
      </Box>
    </Box>
  );
};

// Default
export const Default = {
  args: {
    markers: false,
    showTitle: false,
    title: "",
    xdata: [0, 1, 2, 3, 4, 5],
    xlabel: "X",
    ydata: [0, 20, 30, 40, 50],
    ylabel: "Y"
  },
  render: Template
};

// Card
export const Card = {
  args: {
    markers: false,
    showTitle: false,
    title: "",
    xdata: [0, 1, 2, 3, 4, 5],
    xlabel: "X",
    ydata: [0, 20, 30, 40, 50],
    ylabel: "Y"
  },
  render: TemplateWithCard
};
