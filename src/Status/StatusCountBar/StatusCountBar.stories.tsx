import { Meta, StoryFn } from "@storybook/react";

import { Box } from "@mui/material";
import React from "react";
import StatusCountBar from "./StatusCountBar";
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
/* eslint-disable sort-keys */
export const Default = {
  args: {
    title: "Total Simulations",
    count: {
      running: 2,
      completed: 3,
      aborted: 1
    }
  },
  render: Template
};

/**
 * Example story with a full range of statuses in the StatusCountBar
 */
export const AllStatuses = {
  args: {
    title: "Simulation Statuses",
    count: {
      running: 3,
      queued: 2,
      completed: 4,
      errored: 1,
      aborted: 2,
      ready: 1
    }
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
            count={{
              running: Math.floor(Math.random() * 4),
              completed: Math.floor(Math.random() * 4),
              //   aborted: Math.floor(Math.random() * 2)
              cancelled: Math.floor(Math.random() * 2)
            }}
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
    title: "Simulation Status Grid",
    count: {
      running: 2,
      completed: 4,
      aborted: 1
    }
  },
  render: GridTemplate
};
