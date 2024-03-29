import { Button } from "@mui/material";
import PasswordChangeDialog from "./PasswordChangeDialog";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  component: PasswordChangeDialog,
  title: "Authentication/PasswordChangeDialog"
};

const Template = args => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(args.open);
  }, [args.open]);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <PasswordChangeDialog
        {...args}
        onSubmit={action("passwordChange")}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export const Default = {
  args: { open: true, status: "init" },
  render: Template
};

export const Loading = {
  args: {
    open: true,
    status: "loading"
  },

  render: Template
};

export const Success = {
  args: {
    open: true,
    status: "success",
    successMessage: "Password successfully updated."
  },

  render: Template
};

export const Error = {
  args: {
    errorMessage: "Something went wrong. Please try again.",
    open: true,
    status: "error"
  },

  render: Template
};
