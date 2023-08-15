import { Meta, StoryFn } from "@storybook/react";

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

const Template: StoryFn<WizardActionButtonProps> = args => {
  return <NextButton {...args} />;
};

export const Default = {
  args: {
    disabled: false
  },

  render: Template
};
