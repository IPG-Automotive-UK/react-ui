import {
  Button,
  IconButton,
  Snackbar as MuiSnackbar,
  SnackbarContent,
  makeStyles
} from "@material-ui/core";
import { CheckCircle, Close, Error, Info, Warning } from "@material-ui/icons";
import { amber, green } from "@material-ui/core/colors";
import PropTypes from "prop-types";
import React from "react";
import clsx from "clsx";

// icon map
const icons = {
  error: Error,
  info: Info,
  success: CheckCircle,
  warning: Warning
};

// styling
const useStyles = makeStyles(theme => ({
  action: {
    color: "#fff"
  },
  error: {
    backgroundColor: theme.palette.error.dark,
    color: "#fff"
  },
  icon: {
    float: "left",
    fontSize: 20
  },
  iconVariant: {
    marginRight: theme.spacing(1),
    opacity: 0.9
  },
  info: {
    backgroundColor: theme.palette.primary.main,
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
}));

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
  // styling
  const classes = useStyles();

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
        className={classes.action}
        onClick={event => {
          handleClose(event, "action");
          actionCallback(event);
        }}
      >
        {actionText}
      </Button>
    ) : null;

  // return snackbar
  return (
    <div>
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
          className={classes[variant]}
          message={
            <span className={classes.message}>
              <Icon className={clsx([classes.icon, classes.iconVariant])} />
              {message}
            </span>
          }
          action={[
            actionButton,
            <IconButton
              key="close"
              color="inherit"
              onClick={handleClose}
              className={classes.action}
            >
              <Close className={classes.icon} />
            </IconButton>
          ]}
        />
      </MuiSnackbar>
    </div>
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
