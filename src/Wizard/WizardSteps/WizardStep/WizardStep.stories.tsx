import { Meta, StoryFn, StoryObj } from "@storybook/react";

import React from "react";
import { Typography } from "@mui/material";
import WizardStep from "./WizardStep";
import { WizardStepProps } from "./WizardStep.types";

type Story = StoryObj<typeof WizardStep>;

const meta: Meta<typeof WizardStep> = {
  component: WizardStep,
  title: "Wizard/WizardStep"
};
export default meta;

const Template: StoryFn<WizardStepProps> = args => {
  return <WizardStep {...args} />;
};

export const Default: Story = {
  args: {
    completed: false,
    index: 0,
    label: "Step 1",
    last: false
  },

  render: Template
};

export const WithHelperText: Story = {
  args: {
    ...Default.args,
    helperText: "Helper Text"
  },

  render: Template
};

export const WithErrorText: Story = {
  args: {
    ...Default.args,
    errorText: (
      <Typography variant="caption" color="error">
        Error text
      </Typography>
    )
  },

  render: Template
};

export const WithError: Story = {
  args: {
    ...Default.args,
    error: true
  },

  render: Template
};
