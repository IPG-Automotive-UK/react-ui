import { Meta, StoryFn } from "@storybook/react";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "./DialogTitle";
import type { DialogTitleProps } from "./DialogTitle.types";
import React from "react";

/**
 * Story metadata
 */
const meta: Meta<typeof DialogTitle> = {
  component: DialogTitle,
  title: "Dialog/DialogTitle"
};
export default meta;

// Story Template
const Template: StoryFn<DialogTitleProps> = ({ children, ...rest }) => {
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

// Default story
export const Default = {
  args: {
    children: "An example title",
    onClose: () => null
  },
  render: Template
};

// Story to show the dialog title without close button
export const WithoutCloseButton = {
  args: {
    children: "An example title",
    onClose: null
  },
  render: Template
};

// Story to show the dialog title with a very long string
export const LongTitle = {
  args: {
    children:
      "An example title with a very long string that should be wrapping to the next line",
    onClose: () => null
  },
  render: Template
};

// Story to show the dialog title with a very long string without close button
export const LongTitleWithoutCloseButton = {
  args: {
    children:
      "An example title with a very long string that should be wrapping to the next line",
    onClose: null
  },
  render: Template
};
