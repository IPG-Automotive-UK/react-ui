import { Meta, StoryFn } from "@storybook/react";

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
