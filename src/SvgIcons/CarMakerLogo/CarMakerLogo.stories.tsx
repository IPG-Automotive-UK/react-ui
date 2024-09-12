import { CarMakerLogo } from "./CarMakerLogo";
import { CarMakerLogoProps } from "./CarMakerLogo.types";
import React from "react";

export default {
  component: CarMakerLogo,
  title: "General/SvgIcons/CarMakerLogo"
};

const Template = (args: CarMakerLogoProps) => {
  return <CarMakerLogo {...args} />;
};

export const Default = {
  args: {
    sx: { height: 20, width: 20 }
  },
  render: Template
};
