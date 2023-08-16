import { Meta, StoryFn } from "@storybook/react";

import React from "react";
import SidebarDivider from "./SidebarDivider";

/**
 * Story metadata
 */
const meta: Meta<typeof SidebarDivider> = {
  component: SidebarDivider,
  title: "Layout/SidebarDivider"
};
export default meta;

const Template: StoryFn = () => {
  return <SidebarDivider />;
};

export const Default = {
  args: {},
  render: Template
};
