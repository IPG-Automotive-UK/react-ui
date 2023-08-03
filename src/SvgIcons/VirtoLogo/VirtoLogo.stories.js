import React from "react";
import VirtoLogo from "./VirtoLogo";

export default {
  component: VirtoLogo,
  title: "General/SvgIcons/VirtoLogo"
};

const Template = args => {
  return <VirtoLogo {...args} />;
};

export const Default = {
  render: Template,

  args: {
    sx: { height: 40, width: 160 }
  }
};
