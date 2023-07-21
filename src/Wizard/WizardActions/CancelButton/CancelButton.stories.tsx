import { Meta, Story } from "@storybook/react";

import CancelButton from "./CancelButton";
import React from "react";
import { WizardActionButtonProps } from "../WizardActions.types";

const meta: Meta<typeof CancelButton> = {
  argTypes: {
    onClick: {
      control: false
    }
  },
  component: CancelButton,
  title: "Wizard/CancelButton"
};
export default meta;

const Template: Story<WizardActionButtonProps> = args => {
  return <CancelButton {...args} />;
};

// default story
export const Default = Template.bind({});
Default.args = {
  disabled: false
};
