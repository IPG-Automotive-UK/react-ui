import React from "react";
import VirtoResult from "./VirtoResult";

export default {
  component: VirtoResult,
  title: "General/SvgIcons/VirtoResult"
};

const Template = args => {
  return <VirtoResult {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  sx: { height: 60, width: 60 }
};
