import React from "react";
import UseConfirmDialog from "./UseConfirmDialog";
// import { action } from "@storybook/addon-actions";

export default {
  component: UseConfirmDialog,
  title: "UseConfirmDialog"
};

const Template = args => {
  return <UseConfirmDialog {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
  allowClose: true,
  // buttonOrder: ["Yes", "No"],
  buttonText: "Button",
  cancellationText: "No",
  confirmationKeyword: "",
  confirmationText: "Yes",
  description: "Would you like to continue?",
  hideCancelButton: false,
  onClickCatchHandler: () => {},
  onClickThenHandler: () => {},
  title: "UseConfirmDialog"
};
