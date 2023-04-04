import ActionDialog from "./ActionDialog";
import React from "react";
import { Typography } from "@mui/material";
import { action } from "@storybook/addon-actions";

export default {
  component: ActionDialog,
  title: "General/ActionDialog"
};

const Template = args => {
  return (
    <ActionDialog
      {...args}
      open={true}
      onCancelClick={action("onCancelClick")}
      onSaveClick={action("onSaveClick")}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  cancelText: "cancel",
  content: <Typography>Content goes here</Typography>,
  onCancelClick: () => {},
  onSaveClick: () => {},
  open: true,
  saveEnabled: false,
  saveText: "Save",
  showCloseIcon: true,
  title: "Some title",
  width: "400px"
};
