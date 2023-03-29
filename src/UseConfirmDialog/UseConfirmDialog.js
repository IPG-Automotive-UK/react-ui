import { Button, Link } from "@mui/material";
import { ConfirmProvider, useConfirm } from "material-ui-confirm";

import PropTypes from "prop-types";
import React from "react";
import useTheme from "../ThemeProvider/useTheme";

function ConfirmDialog({
  componentText = "Button",
  title = "UseConfirmDialog",
  description = "Would you like to continue?",
  confirmationText = "Yes",
  cancellationText = "No",
  allowClose = true,
  confirmationKeyword = "",
  hideCancelButton = false,
  buttonOrder = ["cancel", "confirm"],
  thenHandler = () => {},
  catchHandler = () => {},
  buttonVariant = "contained",
  buttonColor = "primary",
  buttonSize = "medium",
  componentType = "Button", // Button or Link
  LinkComponent = "button",
  LinkVariant = "body2",
  LinkColor = "primary",
  LinkUnderline = "hover"
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
        thenHandler("Nikitha");
      })
      .catch(() => {
        catchHandler("Nikitha");
      });
  };

  return (
    <ConfirmProvider>
      {componentType === "Button" ? (
        <Button
          variant={buttonVariant}
          color={buttonColor}
          size={buttonSize}
          onClick={handleClick}
        >
          {componentText}
        </Button>
      ) : (
        <Link
          component={LinkComponent}
          variant={LinkVariant}
          color={LinkColor}
          underline={LinkUnderline}
          onClick={handleClick}
        >
          {componentText}
        </Link>
      )}
    </ConfirmProvider>
  );
}

export default function UseConfirmDialog({
  componentText = "Button",
  title = "UseConfirmDialog",
  description = "Would you like to continue?",
  thenHandler = () => {},
  catchHandler = () => {},
  confirmationText = "Yes",
  cancellationText = "No",
  allowClose = true,
  confirmationKeyword = "",
  hideCancelButton = false,
  buttonOrder = ["cancel", "confirm"],
  buttonVariant = "contained",
  buttonColor = "primary",
  buttonSize = "medium",
  componentType = "Button",
  LinkComponent = "button",
  LinkVariant = "body2",
  LinkColor = "primary",
  LinkUnderline = "hover"
}) {
  return (
    <ConfirmProvider>
      <ConfirmDialog
        componentText={componentText}
        confirmationText={confirmationText}
        cancellationText={cancellationText}
        title={title}
        description={description}
        thenHandler={thenHandler}
        catchHandler={catchHandler}
        allowClose={allowClose}
        confirmationKeyword={confirmationKeyword}
        hideCancelButton={hideCancelButton}
        buttonOrder={buttonOrder}
        buttonVariant={buttonVariant}
        buttonColor={buttonColor}
        buttonSize={buttonSize}
        componentType={componentType}
        LinkComponent={LinkComponent}
        LinkVariant={LinkVariant}
        LinkColor={LinkColor}
      />
    </ConfirmProvider>
  );
}

UseConfirmDialog.propTypes = {
  /**
   * Color of the link
   */
  LinkColor: PropTypes.string,
  /**
   * Component of the link
   */
  LinkComponent: PropTypes.string,
  /**
   * Underline of the link
   */
  LinkUnderline: PropTypes.string,
  /**
   * Variant of the link
   */
  LinkVariant: PropTypes.string,
  /**
   * Allow the dialog to be closed
   */
  allowClose: PropTypes.bool,
  /**
   * Color of the button
   */
  buttonColor: PropTypes.string,
  /**
   * Order of the buttons
   */
  buttonOrder: PropTypes.array,
  /**
   * Size of the button
   */
  buttonSize: PropTypes.string,
  /**
   * Variant of the button
   */
  buttonVariant: PropTypes.string,
  /**
   * Text to display on the cancellation button
   */
  cancellationText: PropTypes.string,
  /**
   * Function to call when the dialog is cancelled
   */
  catchHandler: PropTypes.func,
  /**
   * Text to display on the button
   */
  componentText: PropTypes.string,
  /**
   * Type of the component
   */
  componentType: PropTypes.string,
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
   * Function to call when the dialog is confirmed
   */
  thenHandler: PropTypes.func,
  /**
   * Text to display on the title
   */
  title: PropTypes.string
};
