import React from "react";
import { SnackbarProps } from "../Snackbar/Snackbar.types";

export type SnackbarContextType = {
  close: () => void;
  show: (
    message: SnackbarProps["message"],
    variant: SnackbarProps["variant"],
    autoHideDuration?: SnackbarProps["autoHideDuration"],
    actionText?: SnackbarProps["actionText"],
    actionCallback?: SnackbarProps["actionCallback"]
  ) => void;
};

/**
 * Context for snackbar
 */
export default React.createContext<SnackbarContextType | null>(null);
