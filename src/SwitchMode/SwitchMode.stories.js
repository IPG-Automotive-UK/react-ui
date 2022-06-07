import React from "react";
import SwitchMode from "./SwitchMode";

export default {
  component: SwitchMode,
  title: "General/SwitchMode"
};
const Template = args => {
  return <SwitchMode {...args} />;
};

export const Default = Template.bind({});
