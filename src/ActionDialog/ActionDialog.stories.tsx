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
  title: "General/ActionDialog"
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
