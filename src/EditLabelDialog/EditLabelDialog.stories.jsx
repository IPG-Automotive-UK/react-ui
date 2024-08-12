// write a story

import { Button } from "@mui/material";
import EditLabelDialog from "./EditLabelDialog";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  component: EditLabelDialog,
  title: "Dialog/EditLabelDialog"
};

const Template = args => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleCancel = args => {
    setOpen(false);
    action("cancel")(args);
  };
  const handleSave = args => {
    setOpen(false);
    action("save")(args);
  };
  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open Label Dialog
      </Button>
      <EditLabelDialog
        {...args}
        isOpen={open}
        onClose={handleCancel}
        onEdit={handleSave}
        onNew={handleSave}
      />
    </>
  );
};

// Default
export const Default = {
  args: {
    label: {
      _id: "",
      color: "#005FA8",
      description: "",
      name: ""
    }
  },
  render: Template
};

// Edit Label
export const EditLabel = {
  args: {
    label: {
      _id: "1",
      color: "#005FA8",
      description: "This is a description",
      name: "Label Name"
    },
    labelDialogTitle: "Edit Label"
  },
  render: Template
};
