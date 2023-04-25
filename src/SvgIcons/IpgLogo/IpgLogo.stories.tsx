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
 * Story for the IpgLogo component with light mode overide
 */
export const LightModeOveride = Template.bind({});
LightModeOveride.args = {
  mode: "light",
  sx: { height: 40, width: 160 }
};

/**
 * Story for the IpgLogo component with dark mode overide
 */
export const DarkModeOveride = Template.bind({});
DarkModeOveride.args = {
  mode: "dark",
  sx: { height: 40, width: 160 }
};
