import Snackbar, { SnackbarProps } from "../Snackbar";
import SnackbarContext, { SnackbarContextType } from "./SnackbarContext";

import React from "react";
import { SnackbarProviderProps } from "./SnackbarProvider.types";

type SnackbarStateType = {
  message: SnackbarProps["message"];
  variant: SnackbarProps["variant"];
  autoHideDuration?: SnackbarProps["autoHideDuration"];
  actionText?: SnackbarProps["actionText"];
  actionCallback?: SnackbarProps["actionCallback"];
  open: boolean;
};

/**
 * A helper component for adding a snackbar to an application. Injects a single snackbar component in your application, and exposes context down the React tree to control the snackbar via the useSnackbar hook. It should preferably be used at the root of your component tree.
 */
export default function SnackbarProvider({ children }: SnackbarProviderProps) {
  // snackbar state
  const [snackbar, setSnackbar] = React.useState<SnackbarStateType>({
    actionCallback: () => {},
    actionText: "",
    message: "",
    open: false,
    variant: "info"
  });

  // close snackbar
  const close = React.useCallback<SnackbarContextType["close"]>(
    () =>
      setSnackbar(snackbar => ({
        ...snackbar,
        open: false
      })),
    [setSnackbar]
  );

  // show snackbar
  const show = React.useCallback<SnackbarContextType["show"]>(
    (
      message = "",
      variant = "info",
      autoHideDuration = null,
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
  const contextValue = React.useMemo(() => ({ close, show }), [close, show]);

  // wrap snackbar component and children in provider
  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
      <Snackbar {...snackbar} onClose={close} />
    </SnackbarContext.Provider>
  );
}
