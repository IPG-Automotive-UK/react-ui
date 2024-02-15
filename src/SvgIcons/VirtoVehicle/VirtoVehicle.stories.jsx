import React from "react";
import VirtoVehicle from "./VirtoVehicle";

export default {
  component: VirtoVehicle,
  title: "General/SvgIcons/VirtoVehicle"
};

const Template = args => {
  return <VirtoVehicle {...args} />;
};

export const Default = {
  args: {
    sx: { height: 60, width: 60 }
  },

  render: Template
};
