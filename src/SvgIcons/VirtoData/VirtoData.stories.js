import React from "react";
import VirtoData from "./VirtoData";

export default {
  component: VirtoData,
  title: "General/SvgIcons/VirtoData"
};

const Template = args => {
  return <VirtoData {...args} />;
};

export const Default = {
  args: {
    sx: { height: 60, width: 60 }
  },

  render: Template
};
