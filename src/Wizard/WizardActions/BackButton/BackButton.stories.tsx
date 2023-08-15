import { Meta, StoryFn } from "@storybook/react";

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

const Template: StoryFn<WizardActionButtonProps> = args => {
  return <BackButton {...args} />;
};

export const Default = {
  args: {
    disabled: false
  },

  render: Template
};
