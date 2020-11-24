import { Button } from "@material-ui/core";
import ChangePasswordDialog from "./ChangePasswordDialog";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  component: ChangePasswordDialog,
  title: "Authentication/ChangePasswordDialog"
};

const Template = args => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <ChangePasswordDialog
        {...args}
        onSubmit={action("passwordChange")}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export const Default = Template.bind({});
Default.args = { open: true, status: "init" };

export const Loading = Template.bind({});
Loading.args = {
  open: true,
  status: "loading"
};

export const Success = Template.bind({});
Success.args = {
  open: true,
  status: "success",
  successMessage: "Password successfully updated."
};

export const Error = Template.bind({});
Error.args = {
  errorMessage: "Something went wrong. Please try again.",
  open: true,
  status: "error"
};
