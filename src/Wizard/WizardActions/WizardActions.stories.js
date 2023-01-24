import BackButton from "./BackButton";
import CancelButton from "./CancelButton";
import NextButton from "./NextButton";
import React from "react";
import WizardActions from "./WizardActions";

export default {
  component: WizardActions,
  title: "Wizard/WizardActions"
};

const Template = args => {
  return <WizardActions {...args} />;
};

// default story
export const Default = Template.bind({});
Default.args = {
  children: [
    <CancelButton key={0} />,
    <BackButton key={1} />,
    <NextButton key={2} />
  ]
};
