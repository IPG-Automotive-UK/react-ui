import { Meta, StoryFn } from "@storybook/react";

import React from "react";
import { VirtoLogo } from "./VirtoLogo";
import { VirtoLogoProps } from "./VirtoLogo.types";

/**
 * Story metadata
 */
const meta: Meta<typeof VirtoLogo> = {
  component: VirtoLogo,
  title: "General/SvgIcons/VirtoLogo"
};
export default meta;

const Template: StoryFn<VirtoLogoProps> = args => {
  return <VirtoLogo {...args} />;
};

export const Default = {
  args: {
    sx: { height: 40, width: 160 }
  },

  render: Template
};
