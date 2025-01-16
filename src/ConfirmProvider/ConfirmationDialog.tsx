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
      <Button
        onClick={onCancel}
        {...options.cancellationButtonProps}
        data-testid="confirm-dialog-cancel-button"
      >
        {cancellationText || "Cancel"}
      </Button>
      <Button
        onClick={onConfirm}
        color="primary"
        variant="contained"
        {...options.confirmationButtonProps}
        data-testid="confirm-dialog-confirm-button"
      >
        {confirmationText || "Confirm"}
      </Button>
    </>
  );

  return (
    <>
      {open ? (
        <Dialog
          fullWidth
          {...dialogProps}
          open={true}
          onClose={onClose}
          data-testid="confirm-dialog"
        >
          {title && (
            // use the dialog title from the dialog title component
            <DialogTitle onClose={onCancel} {...titleProps}>
              {title}
            </DialogTitle>
          )}
          <Divider />
          {content ? (
            <DialogContent sx={{ p: 2 }}>
              <DialogContentText
                sx={theme => ({
                  color: theme.palette.text.primary
                })}
              >
                {content}
                <DialogContentText />
              </DialogContentText>
            </DialogContent>
          ) : (
            description && (
              <DialogContent sx={{ p: 2 }}>
                <DialogContentText
                  sx={theme => ({
                    color: theme.palette.text.primary
                  })}
                >
                  {description}
                </DialogContentText>
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
      ) : null}
    </>
  );
};

export default ConfirmationDialog;
