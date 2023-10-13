import { Box, Dialog, DialogContent } from "@mui/material";

import { ConditionalDialogProps } from "./ConditionalDialog.types";
import DialogTitle from "../DialogTitle";
import React from "react";

// This component is used to render a dialog that uses the full width (if the condition is true)
const ConditionalDialog = (props: ConditionalDialogProps) => {
  const { condition, onClose, children, title } = props;
  // If the condition is true, render a dialog with the specified title and content
  if (condition) {
    return (
      <Dialog maxWidth="xl" fullWidth open id="open-dialog">
        <DialogTitle onClose={onClose}>
          <Box sx={title ? {} : { p: 2 }}>{title}</Box>
        </DialogTitle>
        <DialogContent dividers>
          <Box style={{ height: "calc(100vh - 168px)" }}>{children}</Box>
        </DialogContent>
      </Dialog>
    );
  }
  // If the condition is false, render the children as-is
  else {
    return children;
  }
};

export default ConditionalDialog;
