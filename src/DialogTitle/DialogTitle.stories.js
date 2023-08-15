import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "./DialogTitle";
import React from "react";

export default {
  component: DialogTitle,
  title: "General/DialogTitle"
};

const Template = ({ children, ...rest }) => {
  return (
    <Dialog fullWidth maxWidth="sm" open>
      <DialogTitle {...rest}>{children}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Example dialog to showcase the dialog title component
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export const Default = {
  args: {
    children: "An example title",
    onClose: () => null
  },

  render: Template
};
