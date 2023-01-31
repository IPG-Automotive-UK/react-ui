import React from "react";
import { Typography } from "@mui/material";
import WizardStep from "./WizardStep";
import WizardSteps from "./WizardSteps";

export default {
  component: WizardSteps,
  title: "Wizard/WizardSteps"
};

const BasicTemplate = args => {
  return (
    <WizardSteps {...args}>
      <WizardStep label="Step 1" />
      <WizardStep label="Step 2" />
      <WizardStep label="Step 3" />
    </WizardSteps>
  );
};

// default story
export const Default = BasicTemplate.bind({});
Default.args = {
  activeStep: 0
};

const HelperTemplate = args => {
  return (
    <WizardSteps {...args}>
      <WizardStep label="Step 1" helperText="Helper Text 1" />
      <WizardStep label="Step 2" helperText="Helper Text 2" />
      <WizardStep label="Step 3" helperText="Helper Text 3" />
    </WizardSteps>
  );
};

// with helper text
export const WithHelperText = HelperTemplate.bind({});
WithHelperText.args = {
  ...Default.args
};

// with error text
const ErrorTemplate = args => {
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

// with error text
export const WithErrorText = ErrorTemplate.bind({});
WithErrorText.args = {
  activeStep: 1
};
