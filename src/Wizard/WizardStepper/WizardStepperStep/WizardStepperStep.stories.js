import React from "react";
import { Typography } from "@mui/material";
import WizardStepperStep from "./WizardStepperStep";

export default {
  component: WizardStepperStep,
  title: "Wizard/WizardStepperStep"
};

const Template = args => {
  return <WizardStepperStep {...args} />;
};

// default story
export const Default = Template.bind({});
Default.args = {
  completed: false,
  index: 0,
  label: "Step 1",
  last: false
};

// with helper text
export const WithHelperText = Template.bind({});
WithHelperText.args = {
  ...Default.args,
  helperText: "Helper Text"
};

// with error text
export const WithErrorText = Template.bind({});
WithErrorText.args = {
  ...Default.args,
  errorText: (
    <Typography variant="caption" color="error">
      Error text
    </Typography>
  )
};
