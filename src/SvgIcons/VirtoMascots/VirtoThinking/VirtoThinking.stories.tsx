import { Meta, StoryFn } from "@storybook/react";

import React from "react";
import { VirtoThinking } from "./VirtoThinking";
import { VirtoThinkingProps } from "./VirtoThinking.types";

/**
 * Story metadata
 */
const meta: Meta<typeof VirtoThinking> = {
  component: VirtoThinking,
  title: "General/SvgIcons/VirtoMascots/VirtoThinking"
};
export default meta;

const Template: StoryFn<VirtoThinkingProps> = args => {
  return <VirtoThinking {...args} />;
};

export const Default = {
  args: {
    sx: { height: 600, width: 600 }
  },

  render: Template
};
