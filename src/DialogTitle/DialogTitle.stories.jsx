import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "./DialogTitle";
import React from "react";

export default {
  component: DialogTitle,
  title: "Dialog/DialogTitle"
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

export const WithoutCloseButton = {
  args: {
    children: "An example title",
    onClose: null
  },
  render: Template
};

export const LongTitle = {
  args: {
    children:
      "An example title with a very long string that should be wrapping to the next line",
    onClose: () => null
  },
  render: Template
};

export const LongTitleWithoutCloseButton = {
  args: {
    children:
      "An example title with a very long string that should be wrapping to the next line",
    onClose: null
  },
  render: Template
};
