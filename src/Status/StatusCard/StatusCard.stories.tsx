import { Meta, Story } from "@storybook/react";

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
const Template: Story<StatusCardProps> = args => {
  return <StatusCard {...args} />;
};
export const Default = Template.bind({});
Default.args = {
  name: "Status",
  status: "completed"
};
