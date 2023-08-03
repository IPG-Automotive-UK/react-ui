import { ConfirmProvider, useConfirm } from "./ConfirmProvider";

import { Button } from "@mui/material";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  component: ConfirmProvider,
  title: "General/ConfirmProvider"
};

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
const Template = ({ children }) => {
  return <ConfirmProvider>{children}</ConfirmProvider>;
};

export const Default = {
  render: Template,

  args: {
    children: <ConfirmDialog />
  }
};
