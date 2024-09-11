import { AsamLogo } from "./AsamLogo";
import { AsamLogoProps } from "./AsamLogo.types";
import React from "react";

export default {
  component: AsamLogo,
  title: "General/SvgIcons/AsamLogo"
};

const Template = (args: AsamLogoProps) => {
  return <AsamLogo {...args} />;
};

export const Default = {
  args: {
    sx: { height: 20, width: 20 }
  },
  render: Template
};
