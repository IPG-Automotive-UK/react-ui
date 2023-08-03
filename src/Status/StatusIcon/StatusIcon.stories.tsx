import { Meta, Story } from "@storybook/react";

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
const Template: Story<StatusIconProps> = args => {
  return <StatusIcon {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  height: 40,
  status: statusTypes[0],
  width: 40
};
