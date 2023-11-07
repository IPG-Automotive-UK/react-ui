import React from "react";
import VirtoFleet from "./VirtoFleet";

export default {
  component: VirtoFleet,
  title: "General/SvgIcons/VirtoFleet"
};

const Template = args => {
  return <VirtoFleet {...args} />;
};

export const Default = {
  args: {
    sx: { height: 60, width: 60 }
  },

  render: Template
};
