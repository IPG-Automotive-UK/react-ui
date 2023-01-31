import CancelButton from "./CancelButton";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  component: CancelButton,
  title: "Wizard/CancelButton"
};

const Template = args => {
  return <CancelButton {...args} />;
};

// default story
export const Default = Template.bind({});
Default.args = {
  disabled: false,
  onClick: action("onClick")
};
