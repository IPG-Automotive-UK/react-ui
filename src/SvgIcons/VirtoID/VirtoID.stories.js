import React from "react";
import VirtoID from "./VirtoID";

export default {
  component: VirtoID,
  title: "General/SvgIcons/VirtoID"
};

const Template = args => {
  return <VirtoID {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  sx: { height: 60, width: 60 }
};
