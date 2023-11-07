import { ConfirmProvider, useConfirm } from "./ConfirmProvider";
import { fireEvent, render, screen } from "@testing-library/react";

import { Button } from "@mui/material";
import React from "react";
import ThemeProvider from "../ThemeProvider";

function ConfirmDialog() {
  const confirm = useConfirm();

  const handleClick = () => {
    confirm({
      cancellationText: "No",
      confirmationText: "Yes",
      description: "Would you like to continue?",
      title: "Dialog Title"
    })
      .then()
      .catch();
  };

  return (
    <Button variant="contained" onClick={handleClick}>
      Button
    </Button>
  );
}

describe("ConfirmProvider", () => {
  // test to check if dialog is shown with correct title, description, cancellation text and confirmation text
  it("should have the correct default text", () => {
    const { getByText } = render(
      <ThemeProvider theme={"light"}>
        <ConfirmProvider>
          <ConfirmDialog />
        </ConfirmProvider>
      </ThemeProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: "Button" }));

    // verify dialog title
    const dialogTitle = getByText("Dialog Title");
    expect(dialogTitle).toBeVisible();

    // verify dialog description
    const dialogDescription = getByText("Would you like to continue?");
    expect(dialogDescription).toBeVisible();

    // verify dialog confirmation button text
    const dialogConfirmationButton = getByText("Yes");
    expect(dialogConfirmationButton).toBeVisible();

    // verify dialog cancellation button text
    const dialogCancellationButton = getByText("No");
    expect(dialogCancellationButton).toBeVisible();
  });

  // tests to check confirmation dialog supports dark mode
  it("Should support dark mode", () => {
    const { getByText } = render(
      <ThemeProvider theme={"dark"}>
        <ConfirmProvider>
          <ConfirmDialog />
        </ConfirmProvider>
      </ThemeProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: "Button" }));

    // verify dialog  background color
    const dialog = getByText("Dialog Title").closest("div");
    expect(dialog).toHaveStyle("background-color:rgb(56, 56, 56)");

    // verify dialog title color in dark mode
    const dialogTitle = getByText("Dialog Title");
    expect(dialogTitle).toHaveStyle("color: rgb(255, 255, 255)");

    // verify dialog description color in dark mode
    const dialogDescription = getByText("Would you like to continue?");
    expect(dialogDescription).toHaveStyle("color:  rgba(255, 255, 255, 0.7)");

    // verify dialog confirmation button background color and color in dark mode
    const dialogConfirmationButton = getByText("Yes");
    expect(dialogConfirmationButton).toHaveStyle(
      "background-color: rgb(135, 165, 210); color:rgba(0, 0, 0, 0.87)"
    );

    // verify dialog cancellation background color and color in dark mode
    const dialogCancellationButton = getByText("No");
    expect(dialogCancellationButton).toHaveStyle(
      "background-color:transparent; color: rgb(135, 165, 210)"
    );
  });

  // tests to check confirmation dialog supports light mode
  it("Should support light mode", () => {
    const { getByText } = render(
      <ThemeProvider theme="light">
        <ConfirmProvider>
          <ConfirmDialog />
        </ConfirmProvider>
      </ThemeProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: "Button" }));

    // verify dialog background color
    const dialog = getByText("Dialog Title").closest("div");
    expect(dialog).toHaveStyle("background-color: rgb(255, 255, 255)");

    // verify dialog title color in light mode
    const dialogTitle = getByText("Dialog Title");
    expect(dialogTitle).toHaveStyle("color: rgb(0, 0, 0)");

    // verify dialog description color in light mode
    const dialogDescription = getByText("Would you like to continue?");
    expect(dialogDescription).toHaveStyle("color:  rgba(0, 0, 0, 0.6)");

    // verify dialog confirmation button background color and color are correct in light mode
    const dialogConfirmationButton = getByText("Yes");
    fireEvent.mouseLeave(dialogConfirmationButton);
    expect(dialogConfirmationButton).toHaveStyle(
      "background-color: rgb(0, 48, 99); color: rgb(255, 255, 255)"
    );

    // verify dialog cancellation background color and color are correct in light mode
    const dialogCancellationButton = getByText("No");
    fireEvent.mouseLeave(dialogCancellationButton);
    expect(dialogCancellationButton).toHaveStyle(
      "background-color:transparent; color: rgb(0, 48, 99)"
    );
  });
});
