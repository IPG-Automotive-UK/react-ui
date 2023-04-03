import ActionDialog from "./ActionDialog";
import React from "react";

export default {
  component: ActionDialog,
  title: "General/ActionDialog"
};

const Template = args => {
  return <ActionDialog {...args} open={true} />;
};

export const Default = Template.bind({});
Default.args = {
  cancelText: "cancel",
  onChange: () => {},
  open: true,
  saveText: "Save",
  title: "IPG Automotive"
};
