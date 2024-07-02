import { Meta, StoryFn, StoryObj } from "@storybook/react";

import React from "react";
import WizardStep from "./WizardStep";
import WizardSteps from "./WizardSteps";
import { WizardStepsProps } from "./WizardSteps.types";

type Story = StoryObj<typeof WizardSteps>;

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

export const Default: Story = {
  args: {
    activeStep: 0
  },

  render: BasicTemplate
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

export const WithHelperText: Story = {
  args: {
    ...Default.args
  },

  render: HelperTemplate
};

// with error text
const ErrorTemplate: StoryFn<WizardStepsProps> = args => {
  return (
    <WizardSteps {...args}>
      <WizardStep label="Step 1" helperText="Helper Text 1" />
      <WizardStep label="Step 2" helperText="Error Text 2" error={true} />
      <WizardStep label="Step 3" helperText="Helper Text 3" />
    </WizardSteps>
  );
};

export const WithErrorText: Story = {
  args: {
    activeStep: 1
  },

  render: ErrorTemplate
};
