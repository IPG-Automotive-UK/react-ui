import React from "react";
import SnackbarContext from "./SnackbarContext";

/**
 * Hook to control snackbar from within a SnackbarProvider
 */
export default function useSnackbar() {
  const context = React.useContext(SnackbarContext);
  if (!context) {
    throw new Error(`useSnackbar must be used within a SnackbarProvider`);
  }
  return context;
}
