import { Box, Dialog, DialogContent } from "@mui/material";

import DialogTitle from "../DialogTitle";
import { FullScreenDialogProps } from "./FullScreenDialog.types";
import React from "react";

// This component is used to render a dialog that uses the full width (if the condition is true)
const FullScreenDialog = (props: FullScreenDialogProps) => {
  const { condition, onClose, children, dialogTitle } = props;
  // If the condition is true, render a dialog with the specified title and content
  if (condition) {
    return (
      <Dialog maxWidth="xl" fullWidth open>
        <DialogTitle onClose={onClose}>
          <Box sx={dialogTitle ? {} : { p: 2 }}>{dialogTitle}</Box>
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

export default FullScreenDialog;
