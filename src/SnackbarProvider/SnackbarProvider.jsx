import React from "react";
import Snackbar from "../Snackbar";
import SnackbarContext from "./SnackbarContext";

/**
 * A helper component for adding a snackbar to an application. Injects a single snackbar component in your application, and exposes context down the React tree to control the snackbar via the useSnackbar hook. It should preferably be used at the root of your component tree.
 */
export default function SnackbarProvider({ children }) {
  // snackbar state
  const [snackbar, setSnackbar] = React.useState({
    actionCallback: null,
    actionText: null,
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
      variant = "info",
      autoHideDuration = null,
      actionText = null,
      actionCallback = null
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
