import { Button, Typography } from "@mui/material";
import { Meta, StoryFn } from "@storybook/react";
import React, { MouseEventHandler } from "react";

import ActionDialog from "./ActionDialog";
import { ActionDialogProps } from "./ActionDialog.types";
import { action } from "@storybook/addon-actions";

/**
 * Story metadata
 */
const meta: Meta<typeof ActionDialog> = {
  argTypes: {
    content: {
      control: false
    },
    onCancelClick: {
      control: false
    },
    onSaveClick: {
      control: false
    },
    open: {
      control: false
    }
  },
  component: ActionDialog,
  title: "Dialog/ActionDialog"
};
export default meta;

const Template: StoryFn<ActionDialogProps> = args => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleCancel: MouseEventHandler<HTMLButtonElement> = args => {
    setOpen(false);
    action("onCancelClick")(args);
  };
  const handleSave: MouseEventHandler<HTMLButtonElement> = args => {
    setOpen(false);
    action("onSaveClick")(args);
  };
  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button>
      <ActionDialog
        {...args}
        open={open}
        onCancelClick={handleCancel}
        onSaveClick={handleSave}
      />
    </>
  );
};

export const Default = {
  args: {
    cancelDisabled: false,
    cancelText: "cancel",
    content: <Typography>Content goes here</Typography>,
    onCancelClick: () => {},
    onSaveClick: () => {},
    saveDisabled: false,
    saveText: "Save",
    showCloseIcon: true,
    title: "Some title",
    width: "400px"
  },
  render: Template
};

// cancel button and close icon disabled
export const CancelDisabled = {
  args: {
    ...Default.args,
    cancelDisabled: true
  },
  render: Template
};

// save button disabled
export const SaveDisabled = {
  args: {
    ...Default.args,
    saveDisabled: true
  },
  render: Template
};

// Both buttons disabled
export const BothButtonsDisabled = {
  args: {
    ...Default.args,
    cancelDisabled: true,
    saveDisabled: true
  },
  render: Template
};

// dialog without close icon
export const NoCloseIcon = {
  args: {
    ...Default.args,
    showCloseIcon: false
  },
  render: Template
};
