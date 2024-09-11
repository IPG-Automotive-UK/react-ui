import { Meta, StoryFn } from "@storybook/react";

import React from "react";
import { VirtoHeadScratching } from "./VirtoHeadScratching";
import { VirtoHeadScratchingProps } from "./VirtoHeadScratching.types";

/**
 * Story metadata
 */
const meta: Meta<typeof VirtoHeadScratching> = {
  component: VirtoHeadScratching,
  title: "General/SvgIcons/VirtoMascots/VirtoHeadScratching"
};
export default meta;

const Template: StoryFn<VirtoHeadScratchingProps> = args => {
  return <VirtoHeadScratching {...args} />;
};

export const Default = {
  args: {
    sx: { height: 600, width: 600 }
  },

  render: Template
};
