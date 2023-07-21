import { Meta, Story } from "@storybook/react";

import BackButton from "./BackButton";
import React from "react";
import { WizardActionButtonProps } from "../WizardActions.types";

const meta: Meta<typeof BackButton> = {
  argTypes: {
    onClick: {
      control: false
    }
  },
  component: BackButton,
  title: "Wizard/BackButton"
};
export default meta;

const Template: Story<WizardActionButtonProps> = args => {
  return <BackButton {...args} />;
};

// default story
export const Default = Template.bind({});
Default.args = {
  disabled: false
};
