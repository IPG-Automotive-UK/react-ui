import { Meta, StoryFn } from "@storybook/react";

import FullScreenDialog from "./FullScreenDialog";
import { FullScreenDialogProps } from "./FullScreenDialog.types";
import React from "react";

/**
 * Story metadata
 */
const meta: Meta = {
  component: FullScreenDialog,
  title: "Dialog/FullScreenDialog"
};
export default meta;

// Story Template
const Template: StoryFn<FullScreenDialogProps> = args => {
  // Render the FullScreenDialog component with the current arguments
  return (
    <FullScreenDialog {...args}>
      <div>Content goes here</div>
    </FullScreenDialog>
  );
};

// Define the default story
export const Default = {
  // Set the default values for the story's arguments
  args: {
    condition: true,
    dialogTitle: "Dialog Title",
    onClose: () => {}
  },
  // Set the render function to use the story template
  render: Template
};
