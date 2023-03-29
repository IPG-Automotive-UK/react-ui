import { ConfirmProvider, useConfirm } from "material-ui-confirm";

import { Button } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import useTheme from "../ThemeProvider/useTheme";

function ConfirmDialog({
  buttonText = "Button",
  title = "UseConfirmDialog",
  description = "Would you like to continue?",
  confirmationText = "Yes",
  cancellationText = "No",
  allowClose = true,
  confirmationKeyword = "",
  hideCancelButton = false,
  buttonOrder = ["cancel", "confirm"],
  onClickThenHandler = () => {},
  onClickCatchHandler = () => {}
}) {
  // use confirm hook
  const confirm = useConfirm();

  // get theme
  const [theme] = useTheme();

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

  const handleClick = () => {
    // onClickThenHandler(confirm({ description: "Description", title: "title" }));
    console.log(description);
    confirm({
      ...confirmDialogStyle,
      allowClose,
      buttonOrder,
      cancellationText,
      confirmationKeyword,
      confirmationText,
      description,
      hideCancelButton,
      title
    })
      .then(() => {
        onClickThenHandler("Nikitha");
      })
      .catch(() => {
        onClickCatchHandler("Nikitha");
      });
  };

  return (
    <ConfirmProvider>
      <Button onClick={handleClick}>{buttonText}</Button>
    </ConfirmProvider>
  );
}

export default function UseConfirmDialog({
  buttonText = "Button",
  title = "UseConfirmDialog",
  description = "Would you like to continue?",
  onClickThenHandler = () => {},
  onClickCatchHandler = () => {},
  confirmationText = "Yes",
  cancellationText = "No",
  allowClose = true,
  confirmationKeyword = "",
  hideCancelButton = false,
  buttonOrder = ["cancel", "confirm"]
}) {
  return (
    <ConfirmProvider>
      <ConfirmDialog
        buttonText={buttonText}
        confirmationText={confirmationText}
        cancellationText={cancellationText}
        title={title}
        description={description}
        onClickThenHandler={onClickThenHandler}
        onClickCatchHandler={onClickCatchHandler}
        allowClose={allowClose}
        confirmationKeyword={confirmationKeyword}
        hideCancelButton={hideCancelButton}
        buttonOrder={buttonOrder}
      />
    </ConfirmProvider>
  );
}

UseConfirmDialog.propTypes = {
  /**
   * Allow the dialog to be closed
   */
  allowClose: PropTypes.bool,
  /**
   * Order of the buttons
   */
  buttonOrder: PropTypes.array,
  /**
   * Text to display on the button
   */
  buttonText: PropTypes.string,
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
   * Function to call when the dialog is cancelled
   */
  onClickCatchHandler: PropTypes.func,
  /**
   * Function to call when the dialog is confirmed
   */
  onClickThenHandler: PropTypes.func,
  /**
   * Text to display on the title
   */
  title: PropTypes.string
};
