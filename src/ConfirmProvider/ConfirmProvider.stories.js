import { ConfirmProvider, useConfirm } from "./ConfirmProvider";

import { Button } from "@mui/material";
import React from "react";

export default {
  component: ConfirmProvider,
  title: "General/ConfirmProvider"
};

function ConfirmDialog() {
  const confirm = useConfirm();
  const handleClick = () => {
    confirm()
      .then(() => {
        console.log("confirmed");
      })
      .catch(() => {
        console.log("canceled");
      });
  };

  return (
    <Button variant="contained" onClick={handleClick}>
      Button
    </Button>
  );
}

const Template = ({ children }) => {
  return <ConfirmProvider>{children}</ConfirmProvider>;
};

export const Default = Template.bind({});

Default.args = {
  children: <ConfirmDialog />
};
