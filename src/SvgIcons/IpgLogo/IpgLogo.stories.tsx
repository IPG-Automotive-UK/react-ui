import { Meta, StoryFn } from "@storybook/react";

import IpgLogo from "./IpgLogo";
import { IpgLogoProps } from "./IpgLogo.types";
import React from "react";

/**
 * Story metadata
 */
const meta: Meta<typeof IpgLogo> = {
  component: IpgLogo,
  title: "General/SvgIcons/IpgLogo"
};
export default meta;

/**
 * Story template for the IpgLogo component
 */
const Template: StoryFn<IpgLogoProps> = args => {
  return <IpgLogo {...args} />;
};

export const Default = {
  args: {
    sx: { height: 40, width: 160 }
  },

  render: Template
};

export const WhiteTextColour = {
  args: {
    sx: { height: 40, width: 160 },
    textColour: "white"
  },

  render: Template
};

export const BlackTextColour = {
  args: {
    sx: { height: 40, width: 160 },
    textColour: "black"
  },

  render: Template
};
