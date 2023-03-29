import {
  ConfirmProvider as MuiConfirmProvider,
  useConfirm
} from "material-ui-confirm";

import PropTypes from "prop-types";
import React from "react";
import ThemeProvider from "../ThemeProvider/ThemeProvider";
import useTheme from "../ThemeProvider/useTheme";

export default function ConfirmProvider({ children }) {
  const theme = useTheme();
  // const style ConfirmDialog
  const confirmDialogStyle = {
    cancellationButtonProps: {
      sx: {
        color: theme === "light" ? "" : "#87a5d2"
      }
    },
    confirmationButtonProps: {
      sx: {
        bgcolor: theme === "light" ? "" : "#87a5d2"
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
          bgcolor: theme === "light" ? "" : "#383838",
          color: theme === "light" ? "" : "#fff"
        }
      },
      maxWidth: "xs",
      sx: {
        p: 3
      }
    },
    titleProps: {
      sx: {
        mb: 2
      }
    }
  };
  const defaultOptions = {
    ...confirmDialogStyle,
    allowClose: true,
    buttonOrder: ["cancel", "confirm"],
    cancellationText: "No",
    confirmationKeyword: "",
    confirmationText: "Yes",
    description: "Would you like to continue?",
    hideCancelButton: false,
    title: "UseConfirmDialog"
  };
  return (
    <ThemeProvider>
      <MuiConfirmProvider defaultOptions={defaultOptions}>
        {children}
      </MuiConfirmProvider>
    </ThemeProvider>
  );
}

export { useConfirm };

ConfirmProvider.propTypes = {
  /**
   * Allow the dialog to be closed
   */
  allowClose: PropTypes.bool,
  /**
   * Order of the buttons
   */
  buttonOrder: PropTypes.arrayOf(PropTypes.string),
  /**
   * Text to display on the cancellation button
   */
  cancellationText: PropTypes.string,
  /**
   * Keyword to confirm the dialog
   */
  confirmationKeyword: PropTypes.string,
  /**
   * Text to display on the confirmation button
   */
  confirmationText: PropTypes.string,
  /**
   * Text to display on the description
   */
  description: PropTypes.string,
  /**
   * Hide the cancel button
   */
  hideCancelButton: PropTypes.bool,
  /**
   * Text to display on the title
   */
  title: PropTypes.string
};
