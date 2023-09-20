import { Meta, StoryFn } from "@storybook/react";

import React from "react";
import Wizard from "./Wizard";
import { Default as WizardActions } from "./WizardActions/WizardActions.stories";
import { Default as WizardContent } from "./WizardContent/WizardContent.stories";
import { WizardProps } from "./Wizard.types";
import { Default as WizardSteps } from "./WizardSteps/WizardSteps.stories";

const meta: Meta<typeof Wizard> = {
  argTypes: {
    children: {
      control: false
    },
    maxWidth: {
      control: {
        type: "number"
      }
    }
  },
  component: Wizard,
  title: "Wizard/Wizard"
};
export default meta;

const Template: StoryFn<WizardProps> = args => {
  return (
    <Wizard {...args}>
      <WizardSteps.render {...WizardSteps.args} />
      <WizardContent.render {...WizardContent.args} />
      <WizardActions.render {...WizardActions.args} />
    </Wizard>
  );
};

export const Default = {
  args: {
    maxWidth: 1152,
    title: ""
  },

  render: Template
};

export const WithTitle = {
  args: {
    ...Default.args,
    title: "Wizard Title"
  },

  render: Template
};
