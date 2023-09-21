import { Meta, StoryFn } from "@storybook/react";

import React from "react";
import StatusLabel from "./StatusLabel";
import { StatusLabelProps } from "./StatusLabel.types";
import { statusTypes } from "../statuses";

/**
 * Story metadata
 */
const meta: Meta<typeof StatusLabel> = {
  component: StatusLabel,
  title: "Status/StatusLabel"
};
export default meta;

/**
 * Story template for the StatusLabel component
 */
const Template: StoryFn<StatusLabelProps> = args => {
  return <StatusLabel {...args} />;
};

export const Default = {
  args: {
    iconProps: {
      height: 20,
      width: 20
    },
    status: statusTypes[0],
    variant: "body2"
  },
  render: Template
};
