import React from "react";
import { Typography } from "@mui/material";
import WizardStepper from "./WizardStepper";
import WizardStepperStep from "./WizardStepperStep";

export default {
  component: WizardStepper,
  title: "Wizard/WizardStepper"
};

const BasicTemplate = args => {
  return (
    <WizardStepper {...args}>
      <WizardStepperStep label="Step 1" completed={args.activeStep > 0} />
      <WizardStepperStep label="Step 2" completed={args.activeStep > 1} />
      <WizardStepperStep label="Step 3" completed={args.activeStep > 2} />
    </WizardStepper>
  );
};

// default story
export const Default = BasicTemplate.bind({});
Default.args = {
  activeStep: 0
};

const HelperTemplate = args => {
  return (
    <WizardStepper {...args}>
      <WizardStepperStep
        label="Step 1"
        completed={args.activeStep > 0}
        helperText="Helper Text 1"
      />
      <WizardStepperStep
        label="Step 2"
        completed={args.activeStep > 1}
        helperText="Helper Text 2"
      />
      <WizardStepperStep
        label="Step 3"
        completed={args.activeStep > 2}
        helperText="Helper Text 3"
      />
    </WizardStepper>
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
    <WizardStepper {...args}>
      <WizardStepperStep
        label="Step 1"
        completed={args.activeStep > 0}
        helperText="Helper Text 1"
      />
      <WizardStepperStep
        label="Step 2"
        completed={args.activeStep > 1}
        helperText="Helper Text 2"
        errorText={
          <Typography variant="caption" color="error">
            Error Text 2
          </Typography>
        }
      />
      <WizardStepperStep
        label="Step 3"
        completed={args.activeStep > 2}
        helperText="Helper Text 3"
      />
    </WizardStepper>
  );
};

// with error text
export const WithErrorText = ErrorTemplate.bind({});
WithErrorText.args = {
  activeStep: 1
};
