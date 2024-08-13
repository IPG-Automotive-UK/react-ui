// write a story

import { Button } from "@mui/material";
import EditLabelDialog from "./EditLabelDialog";
import React from "react";
import { action } from "@storybook/addon-actions";
import { useArgs } from "@storybook/preview-api";

export default {
  component: EditLabelDialog,
  title: "Dialog/EditLabelDialog"
};

const Template = args => {
  //  useArgs is a hook that returns the current state of the args object
  const [{ isOpen }, updateArgs] = useArgs();

  // handle the dialog open
  const handleClickOpen = () => {
    updateArgs({ isOpen: true });
  };

  // handle the dialog close
  const handleCancel = () => {
    updateArgs({ isOpen: false });
    action("onClose")();
  };

  // handle label edit
  const handleEditLabel = label => {
    updateArgs({ isOpen: false });
    action("onEdit")(label);
  };

  // handle add new label
  const handleAddLabel = label => {
    updateArgs({ isOpen: false });
    action("onNew")(label);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open Label Dialog
      </Button>
      <EditLabelDialog
        {...args}
        isOpen={isOpen}
        onClose={handleCancel}
        onEdit={handleEditLabel}
        onNew={handleAddLabel}
      />
    </>
  );
};

// Default
export const Default = {
  args: {
    isOpen: false,
    label: {
      _id: "",
      color: "#005FA8",
      description: "",
      name: ""
    },
    options: [],
    title: "Add Label"
  },
  render: Template
};

// Edit Label
export const EditLabel = {
  args: {
    ...Default.args,
    label: {
      _id: "1",
      color: "#005FA8",
      description: "This is a description",
      name: "Label Name"
    },
    title: "Edit Label"
  },
  render: Template
};
