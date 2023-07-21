import { Meta, Story } from "@storybook/react";

import React from "react";
import { Typography } from "@mui/material";
import WizardStep from "./WizardStep";
import { WizardStepProps } from "./WizardStep.types";

const meta: Meta<typeof WizardStep> = {
  component: WizardStep,
  title: "Wizard/WizardStep"
};
export default meta;

const Template: Story<WizardStepProps> = args => {
  return <WizardStep {...args} />;
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
