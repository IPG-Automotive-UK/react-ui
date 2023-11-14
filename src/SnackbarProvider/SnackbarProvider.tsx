import React from "react";
import Snackbar from "../Snackbar";
import SnackbarContext from "./SnackbarContext";
import { SnackbarProps } from "../Snackbar/Snackbar.types";
import { SnackbarProviderProps } from "./SnackbarProvider.types";

/**
 * A helper component for adding a snackbar to an application. Injects a single snackbar component in your application, and exposes context down the React tree to control the snackbar via the useSnackbar hook. It should preferably be used at the root of your component tree.
 */
export default function SnackbarProvider({ children }: SnackbarProviderProps) {
  // snackbar state
  const [snackbar, setSnackbar] = React.useState<SnackbarProps>({
    actionCallback: () => {},
    actionText: "",
    message: "",
    open: false,
    variant: "info"
  });

  // close snackbar
  const close = React.useCallback(
    () => setSnackbar(snackbar => ({ ...snackbar, open: false })),
    [setSnackbar]
  );

  // show snackbar
  const show = React.useCallback(
    (
      message = "",
      variant: "info",
      autoHideDuration: null,
      actionText = "",
      actionCallback = () => {}
    ) =>
      setSnackbar({
        actionCallback,
        actionText,
        autoHideDuration,
        message,
        open: true,
        variant
      }),
    [setSnackbar]
  );

  // memoise callbacks
  const value = React.useMemo(() => ({ close, show }), [close, show]);

  // wrap snackbar component and children in provider
  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Snackbar {...snackbar} onClose={close} />
    </SnackbarContext.Provider>
  );
}
