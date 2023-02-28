import React from "react";
import VirtoTest from "./VirtoTest";

export default {
  component: VirtoTest,
  title: "General/SvgIcons/VirtoTest"
};

const Template = args => {
  return <VirtoTest {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  sx: { height: 60, width: 60 }
};
