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
      <WizardSteps {...WizardSteps.args} />
      <WizardContent {...WizardContent.args} />
      <WizardActions {...WizardActions.args} />
    </Wizard>
  );
};

export const Default = {
  render: Template,

  args: {
    maxWidth: 1152,
    title: ""
  }
};

export const WithTitle = {
  render: Template,

  args: {
    ...Default.args,
    title: "Wizard Title"
  }
};
