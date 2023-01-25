import { Default as BackButton } from "./BackButton/BackButton.stories";
import { Default as CancelButton } from "./CancelButton/CancelButton.stories";
import { Default as NextButton } from "./NextButton/NextButton.stories";
import React from "react";
import WizardActions from "./WizardActions";

export default {
  component: WizardActions,
  title: "Wizard/WizardActions"
};

const Template = () => {
  return (
    <WizardActions>
      <CancelButton {...CancelButton.args} />
      <BackButton {...BackButton.args} />
      <NextButton {...NextButton.args} />
    </WizardActions>
  );
};

// default story
export const Default = Template.bind({});
Default.args = {};
