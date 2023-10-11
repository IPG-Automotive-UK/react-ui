import { Meta, StoryFn } from "@storybook/react";

import ConditionalDialog from "./FullScreenDialog";
import { ConditionalDialogProps } from "./FullScreenDialog.types";
import React from "react";

/**
 * Story metadata
 */
const meta: Meta = {
  component: ConditionalDialog,
  title: "Utils/ConditionalDialog"
};
export default meta;

// Story Template
const Template: StoryFn<ConditionalDialogProps> = args => {
  // Render the ConditionalDialog component with the current arguments
  return (
    <ConditionalDialog {...args}>
      <div>Content goes here</div>
    </ConditionalDialog>
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
