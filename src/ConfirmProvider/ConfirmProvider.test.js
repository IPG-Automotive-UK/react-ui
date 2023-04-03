import { ConfirmProvider, useConfirm } from "./ConfirmProvider";
import { fireEvent, render } from "@testing-library/react";

import { Button } from "@mui/material";
import React from "react";
import ThemeProvider from "../ThemeProvider";
import { action } from "@storybook/addon-actions";
// eslint-disable-next-line camelcase
import { unstable_createMuiStrictModeTheme } from "@mui/material/styles";
import { userEvent } from "@storybook/testing-library";

function ConfirmDialog() {
  const confirm = useConfirm();

  const handleClick = () => {
    confirm({
      cancellationText: "No",
      confirmationText: "Yes",
      description: "Would you like to continue?",
      title: "Dialog Title"
    })
      .then(() => {
        action("confirmed");
      })
      .catch(() => {
        action("canceled");
      });
  };

  return (
    <Button variant="contained" onClick={handleClick}>
      Button
    </Button>
  );
}

describe("ConfirmProvider", () => {
  // tests in light mode
  it("onClick button should show dialog with title, description,cancellation text and Confirmation text with appropriate colors and bgcolor in light mode", () => {
    const { getByText } = render(
      <ThemeProvider theme={"light"}>
        <ConfirmProvider>
          <ConfirmDialog />
        </ConfirmProvider>
      </ThemeProvider>
    );
    const button = getByText("Button");
    userEvent.click(button);

    // verify dialog  background color
    const dialog = getByText("Dialog Title").closest("div");
    expect(dialog).toHaveStyle("background-color: rgb(255, 255, 255)");

    // verify dialog title, title color is correct
    const dialogTitle = getByText("Dialog Title");
    expect(dialogTitle).toHaveStyle("color: rgb(0, 0, 0)");
    expect(dialogTitle).toBeVisible();

    // verify dialog description,description color is correct
    const dialogDescription = getByText("Would you like to continue?");
    expect(dialogDescription).toHaveStyle("color:  rgba(0, 0, 0, 0.6)");
    expect(dialogDescription).toBeVisible();

    // verify dialog confirmation button text, background color and color are correct
    const dialogConfirmationButton = getByText("Yes");
    expect(dialogConfirmationButton).toHaveStyle(
      "background-color: rgb(0, 48, 99); color: rgb(255, 255, 255)"
    );
    expect(dialogConfirmationButton).toBeVisible();

    // verify dialog cancellation text, background color and color are correct
    const dialogCancellationButton = getByText("No");
    expect(dialogCancellationButton).toHaveStyle(
      "background-color:transparent; color: rgb(0, 48, 99)"
    );
    expect(dialogCancellationButton).toBeVisible();

    // onclick dialog cancellation button should show alert
    fireEvent.click(dialogCancellationButton);

    // verify that dialog was closed
    expect(dialogTitle).not.toBeVisible();
  });

  // tests in dark mode
  it("onClick button should show dialog with title, description,cancellation text and Confirmation text with appropriate colors and bgcolor in dark mode", () => {
    const theme = unstable_createMuiStrictModeTheme("dark");
    const { getByText } = render(
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <ConfirmProvider>
            <ConfirmDialog />
          </ConfirmProvider>
        </ThemeProvider>
      </React.StrictMode>
    );
    const button = getByText("Button");

    userEvent.click(button);

    // verify dialog  background color
    const dialog = getByText("Dialog Title").closest("div");
    expect(dialog).toHaveStyle("background-color:rgb(56, 56, 56)");

    // verify dialog title, title color is correct
    const dialogTitle = getByText("Dialog Title");
    expect(dialogTitle).toHaveStyle("color: rgb(255, 255, 255)");
    expect(dialogTitle).toBeVisible();

    // verify dialog description,description color is correct
    const dialogDescription = getByText("Would you like to continue?");
    expect(dialogDescription).toHaveStyle("color:  rgba(255, 255, 255, 0.7)");
    expect(dialogDescription).toBeVisible();

    // verify dialog confirmation button text, background color and color are correct
    const dialogConfirmationButton = getByText("Yes");
    expect(dialogConfirmationButton).toHaveStyle(
      "background-color: rgb(135, 165, 210); color:rgba(0, 0, 0, 0.87)"
    );
    expect(dialogConfirmationButton).toBeVisible();

    // verify dialog cancellation text, background color and color are correct
    const dialogCancellationButton = getByText("No");
    expect(dialogCancellationButton).toHaveStyle(
      "background-color:transparent; color: rgb(135, 165, 210)"
    );
    expect(dialogCancellationButton).toBeVisible();

    // onclick dialog cancellation button should show alert
    fireEvent.click(dialogCancellationButton);

    // verify that dialog was closed
    expect(dialogTitle).not.toBeVisible();
  });
});
