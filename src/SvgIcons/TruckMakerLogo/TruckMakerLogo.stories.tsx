import React from "react";
import { TruckMakerLogo } from "./TruckMakerLogo";
import { TruckMakerLogoProps } from "./TruckMakerLogo.types";

export default {
  component: TruckMakerLogo,
  title: "General/SvgIcons/TruckMakerLogo"
};

const Template = (args: TruckMakerLogoProps) => {
  return <TruckMakerLogo {...args} />;
};

export const Default = {
  args: {
    sx: { height: 20, width: 20 }
  },
  render: Template
};
