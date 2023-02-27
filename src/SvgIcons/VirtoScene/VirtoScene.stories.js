import React from "react";
import VirtoScene from "./VirtoScene";

export default {
  component: VirtoScene,
  title: "General/SvgIcons/VirtoScene"
};

const Template = args => {
  return <VirtoScene {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  sx: { height: 60, width: 60 }
};
