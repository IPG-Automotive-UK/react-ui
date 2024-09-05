import { Box, Divider } from "@mui/material";
import Button, { ButtonProps } from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions, { DialogActionsProps } from "@mui/material/DialogActions";
import DialogContent, { DialogContentProps } from "@mui/material/DialogContent";
import DialogTitle, { DialogTitleProps } from "@mui/material/DialogTitle";
import TextField, { TextFieldProps } from "@mui/material/TextField";

import CloseIcon from "@mui/icons-material/Close";
import DialogContentText from "@mui/material/DialogContentText";
import IconButton from "@mui/material/IconButton";
import React from "react";

interface ConfirmationDialogOptions {
  title?: React.ReactNode;
  description?: React.ReactNode;
  content?: React.ReactNode;
  confirmationText?: React.ReactNode;
  cancellationText?: React.ReactNode;
  dialogProps?: DialogProps;
  dialogActionsProps?: DialogActionsProps;
  confirmationButtonProps?: ButtonProps;
  cancellationButtonProps?: ButtonProps;
  titleProps?: DialogTitleProps;
  contentProps?: DialogContentProps;
  allowClose?: boolean;
  confirmationKeyword?: string;
  confirmationKeywordTextFieldProps?: TextFieldProps;
  hideCancelButton?: boolean;
  buttonOrder?: Array<"confirm" | "cancel">;
}

interface ConfirmationDialogProps {
  open: boolean;
  options: ConfirmationDialogOptions;
  onCancel: () => void;
  onConfirm: () => void;
  onClose?: () => void;
}

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
    confirmationButtonProps,
    cancellationButtonProps,
    titleProps,
    contentProps,
    allowClose,
    confirmationKeyword,
    confirmationKeywordTextFieldProps,
    hideCancelButton,
    buttonOrder
  } = options;

  const [confirmationKeywordValue, setConfirmationKeywordValue] =
    React.useState("");

  const confirmationButtonDisabled = Boolean(
    confirmationKeyword && confirmationKeywordValue !== confirmationKeyword
  );

  const confirmationContent = (
    <>
      {confirmationKeyword && (
        <TextField
          onChange={e => setConfirmationKeywordValue(e.target.value)}
          value={confirmationKeywordValue}
          fullWidth
          {...confirmationKeywordTextFieldProps}
        />
      )}
    </>
  );

  const dialogActions = buttonOrder
    ? buttonOrder.map(buttonType => {
        if (buttonType === "cancel") {
          return (
            !hideCancelButton && (
              <Button
                key="cancel"
                {...cancellationButtonProps}
                onClick={onCancel}
              >
                {cancellationText}
              </Button>
            )
          );
        }

        if (buttonType === "confirm") {
          return (
            <Button
              key="confirm"
              color="primary"
              disabled={confirmationButtonDisabled}
              {...confirmationButtonProps}
              onClick={onConfirm}
            >
              {confirmationText}
            </Button>
          );
        }

        throw new Error(
          `Supported button types are only "confirm" and "cancel", got: ${buttonType}`
        );
      })
    : [];

  return (
    <Dialog
      fullWidth
      {...dialogProps}
      open={open}
      onClose={allowClose ? onClose : undefined}
    >
      {title && (
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            pr: "20px"
          }}
        >
          <DialogTitle {...titleProps}>{title}</DialogTitle>
          <IconButton
            edge="end"
            color="inherit"
            onClick={onCancel}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Box>
      )}
      <Divider />
      {content ? (
        <DialogContent {...contentProps}>
          {content}
          {confirmationContent}
        </DialogContent>
      ) : description ? (
        <DialogContent {...contentProps}>
          <DialogContentText>{description}</DialogContentText>
          {confirmationContent}
        </DialogContent>
      ) : (
        confirmationKeyword && (
          <DialogContent {...contentProps}>{confirmationContent}</DialogContent>
        )
      )}
      <Divider />
      <DialogActions {...dialogActionsProps}>{dialogActions}</DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
