import { Meta, Story } from "@storybook/react";

import NextButton from "./NextButton";
import React from "react";
import { WizardActionButtonProps } from "../WizardActions.types";

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

const Template: Story<WizardActionButtonProps> = args => {
  return <NextButton {...args} />;
};

// default story
export const Default = Template.bind({});
Default.args = {
  disabled: false
};
