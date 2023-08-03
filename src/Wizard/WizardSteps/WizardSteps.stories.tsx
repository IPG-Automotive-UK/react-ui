import { Meta, StoryFn } from "@storybook/react";

import React from "react";
import { Typography } from "@mui/material";
import WizardStep from "./WizardStep";
import WizardSteps from "./WizardSteps";
import { WizardStepsProps } from "./WizardSteps.types";

const meta: Meta<typeof WizardSteps> = {
  component: WizardSteps,
  title: "Wizard/WizardSteps"
};
export default meta;

const BasicTemplate: StoryFn<WizardStepsProps> = args => {
  return (
    <WizardSteps {...args}>
      <WizardStep label="Step 1" />
      <WizardStep label="Step 2" />
      <WizardStep label="Step 3" />
    </WizardSteps>
  );
};

export const Default = {
  render: BasicTemplate,

  args: {
    activeStep: 0
  }
};

const HelperTemplate: StoryFn<WizardStepsProps> = args => {
  return (
    <WizardSteps {...args}>
      <WizardStep label="Step 1" helperText="Helper Text 1" />
      <WizardStep label="Step 2" helperText="Helper Text 2" />
      <WizardStep label="Step 3" helperText="Helper Text 3" />
    </WizardSteps>
  );
};

export const WithHelperText = {
  render: HelperTemplate,

  args: {
    ...Default.args
  }
};

// with error text
const ErrorTemplate: StoryFn<WizardStepsProps> = args => {
  return (
    <WizardSteps {...args}>
      <WizardStep label="Step 1" helperText="Helper Text 1" />
      <WizardStep
        label="Step 2"
        helperText="Helper Text 2"
        errorText={
          <Typography variant="caption" color="error">
            Error Text 2
          </Typography>
        }
      />
      <WizardStep label="Step 3" helperText="Helper Text 3" />
    </WizardSteps>
  );
};

export const WithErrorText = {
  render: ErrorTemplate,

  args: {
    activeStep: 1
  }
};
