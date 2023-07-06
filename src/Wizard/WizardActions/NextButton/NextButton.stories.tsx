import { Meta, Story } from "@storybook/react";

import NextButton from "./NextButton";
import { NextButtonProps } from "./NextButton.types";
import React from "react";

const meta: Meta<typeof NextButton> = {
  argTypes: {
    onClick: {
      control: false
    }
  },
  component: NextButton,
  title: "Wizard/NextButton"
};
export default meta;

const Template: Story<NextButtonProps> = args => {
  return <NextButton {...args} />;
};

// default story
export const Default = Template.bind({});
Default.args = {
  disabled: false
};
