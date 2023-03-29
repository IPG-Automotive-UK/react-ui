import React from "react";
import UseConfirmDialog from "./UseConfirmDialog";

export default {
  component: UseConfirmDialog,
  title: "General/UseConfirmDialog"
};

const Template = args => {
  return <UseConfirmDialog {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
  LinkColor: "primary",
  LinkComponent: "button",
  LinkUnderline: "hover",
  LinkVariant: "body2",
  allowClose: true,
  buttonColor: "primary",
  buttonOrder: ["cancel", "confirm"],
  buttonSize: "medium",
  buttonVariant: "contained",
  cancellationText: "No",
  catchHandler: () => {},
  componentText: "Button",
  componentType: "Button",
  confirmationKeyword: "",
  confirmationText: "Yes",
  description: "Would you like to continue?",
  hideCancelButton: false,
  thenHandler: () => {},
  title: "UseConfirmDialog"
};
