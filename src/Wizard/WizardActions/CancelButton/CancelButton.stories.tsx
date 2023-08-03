import { Meta, StoryFn } from "@storybook/react";

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

const Template: StoryFn<WizardActionButtonProps> = args => {
  return <CancelButton {...args} />;
};

export const Default = {
  render: Template,

  args: {
    disabled: false
  }
};
