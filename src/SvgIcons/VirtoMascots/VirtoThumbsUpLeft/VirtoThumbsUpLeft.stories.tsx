import { Meta, StoryFn } from "@storybook/react";

import React from "react";
import { VirtoThumbsUpLeft } from "./VirtoThumbsUpLeft";
import { VirtoThumbsUpLeftProps } from "./VirtoThumbsUpLeft.types";

/**
 * Story metadata
 */
const meta: Meta<typeof VirtoThumbsUpLeft> = {
  component: VirtoThumbsUpLeft,
  title: "General/SvgIcons/VirtoMascots/VirtoThumbsUpLeft"
};
export default meta;

const Template: StoryFn<VirtoThumbsUpLeftProps> = args => {
  return <VirtoThumbsUpLeft {...args} />;
};

export const Default = {
  args: {
    sx: { height: 600, width: 600 }
  },

  render: Template
};
