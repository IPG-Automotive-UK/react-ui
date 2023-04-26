import { Meta, Story } from "@storybook/react";

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
const Template: Story<IpgLogoProps> = args => {
  return <IpgLogo {...args} />;
};

/**
 * Default story for the IpgLogo component
 */
export const Default = Template.bind({});
Default.args = {
  sx: { height: 40, width: 160 }
};

/**
 * Story for the IpgLogo component with textColour set to white
 */
export const WhiteTextColour = Template.bind({});
WhiteTextColour.args = {
  sx: { height: 40, width: 160 },
  textColour: "white"
};

/**
 * Story for the IpgLogo component with textColour set to black
 */
export const BlackTextColour = Template.bind({});
BlackTextColour.args = {
  sx: { height: 40, width: 160 },
  textColour: "black"
};
