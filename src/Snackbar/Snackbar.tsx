import {
  Button,
  IconButton,
  Snackbar as MuiSnackbar,
  SnackbarContent
} from "@mui/material";
import { CheckCircle, Close, Error, Info, Warning } from "@mui/icons-material";
import { amber, green } from "@mui/material/colors";

import React from "react";
import type { SnackbarProps } from "./Snackbar.types";
import { Theme } from "@mui/material/styles";

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
    backgroundColor: (theme: Theme) => theme.palette.error.dark,
    color: "#fff",
    flexWrap: "nowrap"
  },
  icon: {
    float: "left",
    fontSize: 20,
    marginRight: (theme: Theme) => theme.spacing(1),
    opacity: 0.9
  },
  info: {
    backgroundColor: (theme: Theme) => theme.palette.primary.main,
    color: "#fff",
    flexWrap: "nowrap"
  },
  success: {
    backgroundColor: green[600],
    color: "#fff",
    flexWrap: "nowrap"
  },
  warning: {
    backgroundColor: amber[700],
    color: "#fff",
    flexWrap: "nowrap"
  }
};

/**
 * Snackbars provide brief messages about app processes. The component is also known as a toast.
 */
export default function Snackbar({
  actionCallback,
  actionText,
  autoHideDuration,
  message,
  onClose,
  open,
  variant = "info"
}: SnackbarProps) {
  // get icon based on variant
  const Icon = icons[variant];

  // get styling based on variant
  const variantStyle = sx[variant];

  // callback for closing
  const handleClose: SnackbarProps["onClose"] = (event, reason = "timeout") => {
    if (reason === "clickaway") return;
    if (onClose) {
      onClose(event, reason);
    }
  };

  // action button
  const actionButton =
    actionText && actionCallback ? (
      <Button
        key="action"
        onClick={event => {
          handleClose(event, "timeout");
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
        sx={variantStyle}
        message={
          <span>
            <Icon sx={sx.icon} />
            {message}
          </span>
        }
        action={[
          actionButton,
          <IconButton
            key="close"
            color="inherit"
            onClick={event => {
              handleClose(event, "timeout");
            }}
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
