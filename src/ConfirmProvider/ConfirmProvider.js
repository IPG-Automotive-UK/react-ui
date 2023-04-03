import {
  ConfirmProvider as MuiConfirmProvider,
  useConfirm
} from "material-ui-confirm";

import PropTypes from "prop-types";
import React from "react";

// component to wrap the app with to provide the confirm dialog
export function ConfirmProvider({ children }) {
  const confirmDialogStyle = {
    cancellationButtonProps: {
      sx: {
        color: theme => (theme.palette.mode === "light" ? "" : "#87a5d2")
      }
    },
    confirmationButtonProps: {
      sx: {
        bgcolor: theme => (theme.palette.mode === "light" ? "" : "#87a5d2")
      },
      variant: "contained"
    },
    dialogActionsProps: {
      sx: {
        ">:not(:first-of-type)": {
          ml: 3
        },
        p: 2
      }
    },
    dialogProps: {
      PaperProps: {
        // change background colour of dialog
        sx: {
          bgcolor: theme => (theme.palette.mode === "light" ? "" : "#383838"),
          color: theme => (theme.palette.mode === "light" ? "" : "#fff")
        }
      },
      maxWidth: "xs",
      sx: {
        p: 3
      }
    },
    titleProps: {
      sx: {
        color: theme => (theme.palette.mode === "light" ? "#000" : "#fff"),
        mb: 2
      }
    }
  };
  const defaultOptions = {
    ...confirmDialogStyle,
    allowClose: true,
    buttonOrder: ["cancel", "confirm"],
    cancellationText: "No",
    confirmationText: "Yes",
    description: "Would you like to continue?",
    hideCancelButton: false,
    title: "Dialog Title"
  };
  return (
    <MuiConfirmProvider defaultOptions={defaultOptions}>
      {children}
    </MuiConfirmProvider>
  );
}

export { useConfirm };

ConfirmProvider.propTypes = {
  children: PropTypes.node
};
