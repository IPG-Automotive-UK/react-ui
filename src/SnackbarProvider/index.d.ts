import type { SnackbarProps } from "../Snackbar/Snackbar.types";

export type SnackbarProviderProps = {
  children: React.ReactNode;
};

declare const SnackbarProvider: React.FC<SnackbarProviderProps>;

declare const useSnackbar: () => {
  close: () => void;
  show: (
    message: SnackbarProps["message"],
    variant: SnackbarProps["variant"],
    autoHideDuration?: SnackbarProps["autoHideDuration"],
    actionText?: SnackbarProps["actionText"],
    actionCallback?: SnackbarProps["actionCallback"]
  ) => void;
};

export { SnackbarProvider, useSnackbar };
