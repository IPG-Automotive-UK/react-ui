import { Meta, StoryFn, StoryObj } from "@storybook/react";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "./DialogTitle";
import type { DialogTitleProps } from "./DialogTitle.types";
import React from "react";

// Story object type
type Story = StoryObj<typeof DialogTitle>;

/**
 * Story metadata
 */
export default {
  component: DialogTitle,
  title: "Dialog/DialogTitle"
} satisfies Meta<typeof DialogTitle>;

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
export const Default: Story = {
  args: {
    children: "An example title",
    onClose: () => null
  },
  parameters: {
    controls: { include: ["children", "onClose"] }
  },
  render: Template
};

// Story to show the dialog title without close button
export const WithoutCloseButton: Story = {
  args: {
    children: "An example title",
    onClose: undefined
  },
  parameters: {
    controls: { include: ["children"] }
  },
  render: Template
};

// Story to show the dialog title with a very long string
export const LongTitle: Story = {
  args: {
    children:
      "An example title with a very long string that should be wrapping to the next line",
    onClose: () => null
  },
  parameters: {
    controls: { include: ["children", "onClose"] }
  },
  render: Template
};

// Story to show the dialog title with a very long string without close button
export const LongTitleWithoutCloseButton: Story = {
  args: {
    children:
      "An example title with a very long string that should be wrapping to the next line",
    onClose: undefined
  },
  parameters: {
    controls: { include: ["children"] }
  },
  render: Template
};
