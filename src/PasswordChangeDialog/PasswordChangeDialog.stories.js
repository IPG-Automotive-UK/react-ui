import { Button } from "@material-ui/core";
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
