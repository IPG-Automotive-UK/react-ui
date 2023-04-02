import { ConfirmProvider, useConfirm } from "./ConfirmProvider";
import { fireEvent, render } from "@testing-library/react";

import { Button } from "@mui/material";
import React from "react";
import { action } from "@storybook/addon-actions";
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
  it("should have a blue button", () => {
    const { getByText } = render(
      <ConfirmProvider>
        <ConfirmDialog />
      </ConfirmProvider>
    );
    const button = getByText("Button");
    expect(button).toHaveStyle("background-color: rgb(25, 118, 210)");
  });

  it("onClick button should show dialog with title, description,cancellation text and Confirmation text", () => {
    const { getByText } = render(
      <ConfirmProvider>
        <ConfirmDialog />
      </ConfirmProvider>
    );
    const button = getByText("Button");
    userEvent.click(button);

    // verify dialog title is correct
    const dialogTitle = getByText("Dialog Title");
    expect(dialogTitle).toBeVisible();

    // verify dialog description is correct
    const dialogDescription = getByText("Would you like to continue?");
    expect(dialogDescription).toBeVisible();

    // verify dialog confirmation button is correct
    const dialogConfirmationButton = getByText("Yes");
    expect(dialogConfirmationButton).toBeVisible();

    // verify dialog cancellation button is correct
    const dialogCancellationButton = getByText("No");
    expect(dialogCancellationButton).toBeVisible();

    // onclick dialog cancellation button should show alert
    fireEvent.click(dialogCancellationButton);

    // verify that dialog was closed
    expect(dialogTitle).not.toBeVisible();
  });
});
