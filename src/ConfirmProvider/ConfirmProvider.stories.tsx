import { ConfirmProvider, useConfirm } from "./ConfirmProvider";
import { Meta, StoryFn } from "@storybook/react";

import { Button } from "@mui/material";
import { ConfirmProviderProps } from "./ConfirmProvider.types";
import React from "react";
import { action } from "@storybook/addon-actions";

/**
 * Story metadata
 */
const meta: Meta<typeof ConfirmProvider> = {
  component: ConfirmProvider,
  title: "General/ConfirmProvider"
};
export default meta;

// confirm dialog component with useConfirm hook
function ConfirmDialog() {
  const confirm = useConfirm();
  const handleClick = () => {
    confirm()
      .then(() => {
        action("confirmed");
      })
      .catch(() => {
        action("canceled");
      });
  };

  return (
    <Button variant="contained" onClick={handleClick}>
      Button
    </Button>
  );
}

// template for story
const Template: StoryFn<ConfirmProviderProps> = ({ children }) => {
  return <ConfirmProvider>{children}</ConfirmProvider>;
};

export const Default = {
  args: {
    children: <ConfirmDialog />
  },

  render: Template
};
