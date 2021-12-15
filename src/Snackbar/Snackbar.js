import {
  Button,
  IconButton,
  Snackbar as MuiSnackbar,
  SnackbarContent
} from "@mui/material";
import { CheckCircle, Close, Error, Info, Warning } from "@mui/icons-material";
import { amber, green } from "@mui/material/colors";
import PropTypes from "prop-types";
import React from "react";

// icon map
const icons = {
  error: Error,
  info: Info,
  success: CheckCircle,
  warning: Warning
};

// styling
const sx = {
  action: {
    color: "#fff"
  },
  close: {
    fontSize: 15
  },
  error: {
    backgroundColor: theme => theme.palette.error.dark,
    color: "#fff"
  },
  icon: {
    float: "left",
    fontSize: 20,
    marginRight: theme => theme.spacing(1),
    opacity: 0.9
  },
  info: {
    backgroundColor: theme => theme.palette.primary.main,
    color: "#fff"
  },
  success: {
    backgroundColor: green[600],
    color: "#fff"
  },
  warning: {
    backgroundColor: amber[700],
    color: "#fff"
  }
};

/**
 * Snackbars provide brief messages about app processes. The component is also known as a toast.
 */
export default function Snackbar({
  actionCallback,
  actionText,
  autoHideDuration = null,
  message,
  onClose,
  open,
  variant = "info"
}) {
  // icon
  const Icon = icons[variant];

  // callback for closing
  const handleClose = (event, reason = "action") => {
    if (reason === "clickaway") return;
    onClose(event, reason);
  };

  // action button
  const actionButton =
    actionText && actionCallback ? (
      <Button
        key="action"
        onClick={event => {
          handleClose(event, "action");
          actionCallback(event);
        }}
        sx={sx.action}
      >
        {actionText}
      </Button>
    ) : null;

  // return snackbar
  return (
    <MuiSnackbar
      autoHideDuration={autoHideDuration}
      anchorOrigin={{
        horizontal: "center",
        vertical: "bottom"
      }}
      onClose={handleClose}
      open={open}
    >
      <SnackbarContent
        sx={sx[variant]}
        message={
          <span sx={sx.message}>
            <Icon sx={sx.icon} />
            {message}
          </span>
        }
        action={[
          actionButton,
          <IconButton
            key="close"
            color="inherit"
            onClick={handleClose}
            size="large"
            sx={sx.action}
          >
            <Close sx={sx.close} />
          </IconButton>
        ]}
      />
    </MuiSnackbar>
  );
}
// prop types
Snackbar.propTypes = {
  /**
   * Callback fired when the user clicks the action button.
   *
   * **Signature**
   * ```
   * function(event: object) => void
   * ```
   * _event_: The event source of the callback.
   */
  actionCallback: PropTypes.func,
  /**
   * The action button text to display. It renders after the message, at the end of the snackbar.
   */
  actionText: PropTypes.string,
  /**
   * The number of milliseconds to wait before automatically calling the onClose function. onClose should then set the state of the open prop to hide the Snackbar. This behavior is disabled by default with the null value.
   */
  autoHideDuration: PropTypes.number,
  /**
   * The message to display.
   */
  message: PropTypes.node.isRequired,
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
  onClose: PropTypes.func,
  /**
   * If true, Snackbar is open.
   */
  open: PropTypes.bool.isRequired,
  /**
   * Variant used to control the styling and icon.
   */
  variant: PropTypes.oneOf(Object.keys(icons))
};
