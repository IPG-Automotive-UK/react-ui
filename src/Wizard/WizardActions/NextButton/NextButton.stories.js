import NextButton from "./NextButton";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  component: NextButton,
  title: "Wizard/NextButton"
};

const Template = args => {
  return <NextButton {...args} />;
};

// default story
export const Default = Template.bind({});
Default.args = {
  disabled: false,
  onClick: action("onClick")
};
