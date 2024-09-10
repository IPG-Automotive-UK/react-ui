import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider
} from "@mui/material";

import { ConfirmationDialogProps } from "./ConfirmProvider.types";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "../DialogTitle";
import React from "react";

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  options,
  onCancel,
  onConfirm,
  onClose
}) => {
  const {
    title,
    description,
    content,
    confirmationText,
    cancellationText,
    dialogProps,
    dialogActionsProps,
    titleProps
  } = options;

  // dialog actions for the confirmation dialog component (confirm and cancel buttons)
  const dialogActions = (
    <>
      <Button onClick={onCancel} {...options.cancellationButtonProps}>
        {cancellationText || "Cancel"}
      </Button>
      <Button
        onClick={onConfirm}
        color="primary"
        variant="contained"
        {...options.confirmationButtonProps}
      >
        {confirmationText || "Confirm"}
      </Button>
    </>
  );

  return (
    <Dialog fullWidth {...dialogProps} open={open} onClose={onClose}>
      {title && (
        // use the dialog title from the dialog title component
        <DialogTitle onClose={onCancel} {...titleProps}>
          {title}
        </DialogTitle>
      )}
      <Divider />
      {content ? (
        <DialogContent>{content}</DialogContent>
      ) : (
        description && (
          <DialogContent>
            <DialogContentText>{description}</DialogContentText>
          </DialogContent>
        )
      )}
      <Divider />
      <DialogActions
        sx={{ justifyContent: "flex-end", padding: "16px" }}
        {...dialogActionsProps}
      >
        {dialogActions}
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
