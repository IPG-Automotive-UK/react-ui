import { Meta, StoryFn } from "@storybook/react";

import { Default as BackButton } from "./BackButton/BackButton.stories";
import { Default as CancelButton } from "./CancelButton/CancelButton.stories";
import { Default as NextButton } from "./NextButton/NextButton.stories";
import React from "react";
import WizardActions from "./WizardActions";
import { WizardActionsProps } from "./WizardActions.types";

const meta: Meta<typeof WizardActions> = {
  component: WizardActions,
  title: "Wizard/WizardActions"
};
export default meta;

const Template: StoryFn<WizardActionsProps> = () => {
  return (
    <WizardActions>
      <CancelButton.render {...CancelButton.args} />
      <BackButton.render {...BackButton.args} />
      <NextButton.render {...NextButton.args} />
    </WizardActions>
  );
};

export const Default = {
  args: {},
  render: Template
};
