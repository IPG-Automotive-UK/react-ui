import { Meta, StoryFn } from "@storybook/react";

import React from "react";
import { Typography } from "@mui/material";
import WizardStep from "./WizardStep";
import { WizardStepProps } from "./WizardStep.types";

const meta: Meta<typeof WizardStep> = {
  component: WizardStep,
  title: "Wizard/WizardStep"
};
export default meta;

const Template: StoryFn<WizardStepProps> = args => {
  return <WizardStep {...args} />;
};

export const Default = {
  render: Template,

  args: {
    completed: false,
    index: 0,
    label: "Step 1",
    last: false
  }
};

export const WithHelperText = {
  render: Template,

  args: {
    ...Default.args,
    helperText: "Helper Text"
  }
};

export const WithErrorText = {
  render: Template,

  args: {
    ...Default.args,
    errorText: (
      <Typography variant="caption" color="error">
        Error text
      </Typography>
    )
  }
};
