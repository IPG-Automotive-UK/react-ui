import { Meta, StoryFn } from "@storybook/react";

import React from "react";
import { VirtoShrugging } from "./VirtoShrugging";
import { VirtoShruggingProps } from "./VirtoShrugging.types";

/**
 * Story metadata
 */
const meta: Meta<typeof VirtoShrugging> = {
  component: VirtoShrugging,
  title: "General/SvgIcons/VirtoMascots/VirtoShrugging"
};
export default meta;

const Template: StoryFn<VirtoShruggingProps> = args => {
  return <VirtoShrugging {...args} />;
};

export const Default = {
  args: {
    sx: { height: 600, width: 600 }
  },

  render: Template
};
