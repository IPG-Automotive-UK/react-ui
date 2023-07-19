import { Box, Button, LinearProgress } from "@mui/material";
import { Meta, Story } from "@storybook/react";

import React from "react";
import Snackbar from "./Snackbar";
import { SnackbarProps } from "./Snackbar.types";
import { action } from "@storybook/addon-actions";

/**
 * Story metadata
 */
const meta: Meta<typeof Snackbar> = {
  argTypes: {
    actionCallback: {
      control: false
    },
    autoHideDuration: {
      control: {
        type: "number"
      }
    },
    onClose: {
      control: false
    }
  },
  component: Snackbar,
  title: "General/Snackbar"
};
export default meta;

// Template for the Snackbar stories to manage the state of the Snackbar
const Template: Story<SnackbarProps> = args => {
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

// Default story for the Snackbar component
export const Default = Template.bind({});
Default.args = {
  message: "This is a snackbar",
  open: false,
  variant: "info"
};

// Multi-line message story for the Snackbar component
export const MultiLineMessage = Template.bind({});
MultiLineMessage.args = {
  message:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  open: false,
  variant: "info"
};

// Action button story for the Snackbar component
export const ActionButton = Template.bind({});
ActionButton.args = {
  actionCallback: action("onAction"),
  actionText: "Click me",
  message: "This snackbar has an action button",
  open: false,
  variant: "warning"
};

// Complex message story for the Snackbar component
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
  open: false,
  variant: "info"
};
