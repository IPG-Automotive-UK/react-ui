import { Box, Button, LinearProgress } from "@mui/material";
import React from "react";
import Snackbar from "./Snackbar";
import { action } from "@storybook/addon-actions";

export default {
  component: Snackbar,
  title: "General/Snackbar"
};

const Template = args => {
  const [open, setOpen] = React.useState(false);
  const [actionText, setActionText] = React.useState(args.actionText);
  const [autoHideDuration, setAutoHideDuration] = React.useState(
    args.autoHideDuration
  );
  const onClose = () => setOpen(false);

  React.useEffect(() => {
    setOpen(args.open);
  }, [args.open]);

  React.useEffect(() => {
    setActionText(args.actionText);
  }, [args.actionText]);

  React.useEffect(() => {
    setAutoHideDuration(args.autoHideDuration);
  }, [args.autoHideDuration]);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open snackbar</Button>
      <Snackbar
        {...args}
        autoHideDuration={autoHideDuration}
        actionText={actionText}
        actionCallback={action("onAction")}
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
Default.args = { message: "This is a snackbar", open: false };

export const ActionButton = Template.bind({});
ActionButton.args = {
  actionCallback: action("onAction"),
  actionText: "Click me",
  message: "This snackbar has an action button",
  open: false,
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
  open: false
};
