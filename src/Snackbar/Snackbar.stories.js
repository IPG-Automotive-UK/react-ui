import { Box, Button, LinearProgress } from "@material-ui/core";
import React from "react";
import Snackbar from "./Snackbar";
import { action } from "@storybook/addon-actions";

export default {
  component: Snackbar,
  title: "General/Snackbar"
};

const Template = args => {
  const [open, setOpen] = React.useState(false);
  const onClose = () => setOpen(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open snackbar</Button>
      <Snackbar
        {...args}
        open={open}
        onClose={args => {
          onClose();
          action("onClose")(args);
        }}
      />
    </>
  );
};

export const Default = Template.bind({});
Default.args = { message: "This is a snackbar", open: true };

export const ActionButton = Template.bind({});
ActionButton.args = {
  actionCallback: action("onAction"),
  actionText: "Click me",
  message: "This snackbar has an action button",
  open: true,
  variant: "warning"
};

export const ComplexMessage = Template.bind({});
ComplexMessage.args = {
  message: (
    <>
      Showing some progress
      <Box mt={1}>
        <LinearProgress />
      </Box>
    </>
  ),
  open: true
};
