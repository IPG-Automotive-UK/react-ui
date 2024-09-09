import { ButtonProps } from "@mui/material/Button";
import { DialogActionsProps } from "@mui/material/DialogActions";
import { DialogProps } from "@mui/material/Dialog";
import { DialogTitleProps } from "@mui/material/DialogTitle";
import { ReactNode } from "react";

interface ConfirmationDialogOptions {
  title?: React.ReactNode;
  description?: React.ReactNode;
  content?: React.ReactNode;
  confirmationText?: React.ReactNode;
  cancellationText?: React.ReactNode;
  dialogProps?: Partial<DialogProps>;
  dialogActionsProps?: DialogActionsProps;
  confirmationButtonProps?: ButtonProps;
  cancellationButtonProps?: ButtonProps;
  titleProps?: DialogTitleProps;
}

interface ConfirmationDialogProps {
  open: boolean;
  options: ConfirmationDialogOptions;
  onCancel: () => void;
  onConfirm: () => void;
  onClose?: () => void;
}

interface ConfirmProviderProps {
  children: ReactNode;
  defaultOptions?: Partial<ConfirmationDialogOptions>;
}

export {
  ConfirmationDialogProps,
  ConfirmationDialogOptions,
  ConfirmProviderProps
};
