import ConfirmProvider from "./ConfirmProvider";
import React from "react";

export default {
  component: ConfirmProvider,
  title: "General/ConfirmProvider"
};

const Template = args => {
  return <ConfirmProvider {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  defaultOptions: { confirmationText: "Yes", title: "Confirm Dialog" }
};
