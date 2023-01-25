import React from "react";
import Wizard from "./Wizard";
import { Default as WizardActions } from "./WizardActions/WizardActions.stories";
import { Default as WizardContent } from "./WizardContent/WizardContent.stories";
import { Default as WizardSteps } from "./WizardSteps/WizardSteps.stories";

export default {
  component: Wizard,
  title: "Wizard/Wizard"
};

const Template = args => {
  return (
    <Wizard {...args}>
      <WizardSteps {...WizardSteps.args} />
      <WizardContent {...WizardContent.args} />
      <WizardActions {...WizardActions.args} />
    </Wizard>
  );
};

// default story
export const Default = Template.bind({});
Default.args = {
  title: "Wizard Title"
};

// no title story
export const NoTitle = Template.bind({});
NoTitle.args = {
  title: ""
};
