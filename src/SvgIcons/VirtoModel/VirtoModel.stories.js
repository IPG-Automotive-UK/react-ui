import React from "react";
import VirtoModel from "./VirtoModel";

export default {
  component: VirtoModel,
  title: "General/SvgIcons/VirtoModel"
};

const Template = args => {
  return <VirtoModel {...args} />;
};

export const Default = {
  render: Template,

  args: {
    sx: { height: 60, width: 60 }
  }
};
