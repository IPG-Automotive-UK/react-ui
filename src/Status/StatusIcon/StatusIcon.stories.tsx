import { Meta, StoryFn } from "@storybook/react";

import React from "react";
import StatusIcon from "./StatusIcon";
import { StatusIconProps } from "./StatusIcon.types";
import { statusTypes } from "../statuses";

/**
 * Story metadata
 */
const meta: Meta<typeof StatusIcon> = {
  component: StatusIcon,
  title: "Status/StatusIcon"
};
export default meta;

/**
 * Story template for the StatusIcon component
 */
const Template: StoryFn<StatusIconProps> = args => {
  return <StatusIcon {...args} />;
};

/**
 * Default story
 */
export const Default = {
  args: {
    height: 40,
    status: statusTypes[0],
    width: 40
  },
  render: Template
};

/**
 * This story will display a tooltip on hover of the Icon
 */
export const WithTooltip = {
  args: {
    ...Default.args,
    iconTooltipText: "Last update: 2 days ago",
    status: statusTypes[2]
  },
  render: Template
};
