import React from "react";
import VirtoBuild from "./VirtoBuild";

export default {
  component: VirtoBuild,
  title: "General/SvgIcons/VirtoBuild"
};

const Template = args => {
  return <VirtoBuild {...args} />;
};

export const Default = {
  render: Template,

  args: {
    sx: { height: 60, width: 60 }
  }
};
