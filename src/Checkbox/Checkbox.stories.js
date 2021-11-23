import Checkbox from "./Checkbox";
import React from "react";

export default {
  component: Checkbox,
  title: "General/Checkbox"
};

const Template = args => {
  return <Checkbox {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  checked: false,
  disabled: false,
  label: "Disabled",
  size: "medium"
};
