import BackButton from "./BackButton";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  component: BackButton,
  title: "Wizard/BackButton"
};

const Template = args => {
  return <BackButton {...args} />;
};

// default story
export const Default = Template.bind({});
Default.args = {
  disabled: false,
  onClick: action("onClick")
};
