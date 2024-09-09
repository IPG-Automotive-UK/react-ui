import { ButtonProps } from "@mui/material/Button";
import { DialogActionsProps } from "@mui/material/DialogActions";
import { DialogProps } from "@mui/material/Dialog";
import { DialogTitleProps } from "@mui/material/DialogTitle";
import { ReactNode } from "react";

type ConfirmationDialogOptions = {
  /**
   * The title of the dialog.
   */
  title?: ReactNode;
  /**
   * The description of the dialog.
   */
  description?: ReactNode;
  /**
   * The content of the dialog.
   */
  content?: ReactNode;
  /**
   * The text for the confirmation button.
   */
  confirmationText?: ReactNode;
  /**
   * The text for the cancellation button.
   */
  cancellationText?: ReactNode;
  /**
   * Props for the dialog component.
   */
  dialogProps?: Partial<DialogProps>;
  /**
   * Props for the dialog actions component.
   */
  dialogActionsProps?: DialogActionsProps;
  /**
   * Props for the confirmation button.
   */
  confirmationButtonProps?: ButtonProps;
  /**
   * Props for the cancellation button.
   */
  cancellationButtonProps?: ButtonProps;
  /**
   * Props for the title component.
   */
  titleProps?: DialogTitleProps;
};

type ConfirmationDialogProps = {
  /**
   * The open state of the dialog.
   */
  open: boolean;
  /**
   * The options for the dialog.
   */
  options: ConfirmationDialogOptions;
  /**
   * Callback fired when the dialog is cancelled.
   * @returns void
   */
  onCancel: () => void;
  /**
   * Callback fired when the dialog is confirmed.
   * @returns void
   */
  onConfirm: () => void;
  /**
   * Callback fired when the dialog is closed.
   * @returns void
   */
  onClose?: () => void;
};

type ConfirmProviderProps = {
  /**
   * The children to render.
   */
  children: ReactNode;
  /**
   * The default options for the confirmation dialog.
   */
  defaultOptions?: Partial<ConfirmationDialogOptions>;
};

type ConfirmContextProps = {
  /**
   * The function to confirm an action.
   */
  confirmBase: (
    parentId: string,
    options?: Partial<ConfirmationDialogOptions>
  ) => Promise<void>;
  /**
   * The function to close the dialog when the parent unmounts.
   */
  closeOnParentUnmount: (parentId: string) => void;
};

type ConfirmState = {
  /**
   * The parent id of the dialog.
   */
  parentId: string;
  /**
   * The resolve function.
   */
  resolve: () => void;
  /**
   * The reject function.
   */
  reject: () => void;
};

export {
  ConfirmContextProps,
  ConfirmationDialogProps,
  ConfirmationDialogOptions,
  ConfirmProviderProps,
  ConfirmState
};
