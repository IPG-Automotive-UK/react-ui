import { ButtonProps } from "@mui/material/Button";
import { DialogActionsProps } from "@mui/material/DialogActions";
import { DialogContentProps } from "@mui/material/DialogContent";
import { DialogProps } from "@mui/material/Dialog";
import { DialogTitleProps } from "@mui/material/DialogTitle";
import { ReactNode } from "react";
import { TextFieldProps } from "@mui/material/TextField";

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

interface ConfirmProviderProps {
  children: ReactNode;
  defaultOptions?: Partial<ConfirmationDialogOptions>;
}

export {
  ConfirmationDialogProps,
  ConfirmationDialogOptions,
  ConfirmProviderProps
};
