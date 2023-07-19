import {
  SnackbarProps as MuiSnackbarProps,
  SnackbarContentProps
} from "@mui/material";

export interface SnackbarProps {
  /**
   * Callback fired when the user clicks the action button.
   *
   * **Signature**
   * ```
   * function(event: object) => void
   * ```
   * _event_: The event source of the callback.
   */
  actionCallback?: (event: React.SyntheticEvent<HTMLElement>) => void;
  /**
   * The action button text to display. It renders after the message, at the end of the snackbar.
   */
  actionText?: string;
  /**
   * The number of milliseconds to wait before automatically calling the onClose function. onClose should then set the state of the open prop to hide the Snackbar. This behavior is disabled by default with the null value.
   */
  autoHideDuration?: MuiSnackbarProps["autoHideDuration"];
  /**
   * The message to display.
   */
  message: SnackbarContentProps["message"];
  /**
   * Callback fired when the component requests to be closed. Typically onClose is used to set state in the parent component, which is used to control the Snackbar open prop.
   *
   * **Signature**
   * ```
   * function(event, reason) => void
   * ```
   *
   * _event_: The event source of the callback.
   *
   * _reason_: Can be: "timeout" (autoHideDuration expired), "clickaway", "action".
   */
  onClose: MuiSnackbarProps["onClose"];
  /**
   * If true, Snackbar is open.
   */
  open: boolean;
  /**
   * Variant used to control the styling and icon.
   */
  variant?: "error" | "info" | "success" | "warning";
}
