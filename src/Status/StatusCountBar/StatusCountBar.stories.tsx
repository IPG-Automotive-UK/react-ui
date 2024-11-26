import { Meta, StoryFn } from "@storybook/react";

import { Box } from "@mui/material";
import React from "react";
import { StatusCountBar } from "./StatusCountBar";
import { StatusCountBarProps } from "./StatusCountBar.types";

/**
 * Story metadata
 */
const meta: Meta<typeof StatusCountBar> = {
  component: StatusCountBar,
  title: "Status/StatusCountBar"
};
export default meta;

/**
 * Story template for the StatusCountBar component
 */
const Template: StoryFn<StatusCountBarProps> = args => {
  return <StatusCountBar {...args} />;
};

/**
 * Default story for the StatusCountBar component
 */
// The component will accept the count object in perticular order from Virto that is why we have to disable the sort-keys from the eslint.
/* eslint-disable sort-keys */
export const Default = {
  args: {
    count: {
      aborted: 1,
      aborting: 2,
      completed: 3,
      running: 2
    },
    title: "Total Simulations"
  },
  render: Template
};

/**
 * Example story with a full range of statuses in the StatusCountBar
 */
export const AllStatuses = {
  args: {
    count: {
      aborted: 2,
      aborting: 2,
      completed: 4,
      errored: 1,
      queued: 2,
      ready: 1,
      running: 3
    },
    title: "Simulation Statuses"
  },
  render: Template
};

/**
 * Story template for StatusCountBar in a grid layout (multiple bars)
 */
const GridTemplate: StoryFn<StatusCountBarProps> = args => {
  return (
    <Box
      sx={theme => ({
        display: "grid",
        gap: 2,
        [theme.breakpoints.up("lg")]: {
          gridTemplateColumns: "repeat(3, 1fr)"
        },
        [theme.breakpoints.up("sm")]: {
          gridTemplateColumns: "repeat(2, 1fr)"
        }
      })}
    >
      {Array(6)
        .fill(null)
        .map((_, index) => (
          <StatusCountBar
            key={index}
            title={`Simulation Status ${index + 1}`}
            count={args.count}
          />
        ))}
    </Box>
  );
};

/**
 * Grid layout example for StatusCountBar
 */
export const WithGridLayout = {
  args: {
    count: {
      aborted: 1,
      aborting: 2,
      completed: 4,
      running: 2
    },
    title: "Simulation Status Grid"
  },
  render: GridTemplate
};
