import { Meta, StoryFn } from "@storybook/react";

import { Box } from "@mui/material";
import React from "react";
import StatusCard from "./StatusCard";
import { StatusCardProps } from "./StatusCard.types";

/**
 * Story metadata
 */
const meta: Meta<typeof StatusCard> = {
  component: StatusCard,
  title: "Status/StatusCard"
};
export default meta;

/**
 * Story template for the StatusCard component
 */
const Template: StoryFn<StatusCardProps> = args => {
  return <StatusCard {...args} />;
};

// List of statuses to display
const statusList = [
  {
    name: "Test title 1",
    status: "failed"
  },
  {
    name: "This is a long title that will be truncated as this is a long title that will be truncated",
    status: "passed"
  },
  {
    name: "Test title 2",
    status: "pending"
  },
  {
    name: "Test title 3",
    status: "completed"
  },
  {
    name: "Test title 4",
    status: "queued"
  },
  {
    name: "Another title that will be truncated as this is a long title that will be truncated",
    status: "cancelled"
  }
] as const;

/**
 * Story template for the StatusCard with a fixed width wrapper
 */
const WithGrid: StoryFn<StatusCardProps> = args => {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
      {statusList.map(s => {
        return (
          <Box
            key={s.name}
            sx={theme => ({
              flex: "1 1 100%",
              [theme.breakpoints.up("lg")]: {
                flex: "1 1 30%"
              },
              [theme.breakpoints.up("md")]: {
                flex: "1 1 40%"
              }
            })}
          >
            <StatusCard
              name={s.name}
              status={s.status}
              titleVariant={args.titleVariant}
            />
          </Box>
        );
      })}
    </Box>
  );
};

/**
 * Default story
 */
export const Default = {
  args: {
    name: "Title",
    status: "passed"
  },

  render: Template
};

/**
 * This story will display a tooltip on hover of the Icon
 */
export const WithIconTooltip = {
  args: {
    ...Default.args,
    iconTooltipText: "Last update: 2 days ago",
    status: "failed"
  },

  render: Template
};

/**
 * This story will display a different title variant and truncated title with tooltip if it is too long
 */
export const WithGridLayout = {
  argTypes: {
    iconTooltipText: {
      control: false
    },
    name: {
      control: false
    },
    status: {
      control: false
    }
  },
  args: {
    ...Default.args
  },
  render: WithGrid
};
