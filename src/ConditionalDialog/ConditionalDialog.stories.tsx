import { Meta, StoryFn } from "@storybook/react";

import ConditionalDialog from "./ConditionalDialog";
import { ConditionalDialogProps } from "./ConditionalDialog.types";
import React from "react";

/**
 * Story metadata
 */
const meta: Meta = {
  component: ConditionalDialog,
  title: "Dialog/ConditionalDialog"
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
    onClose: () => {},
    title: "Dialog Title"
  },
  // Set the render function to use the story template
  render: Template
};
