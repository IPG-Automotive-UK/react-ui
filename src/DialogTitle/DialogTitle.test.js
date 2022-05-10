import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "./DialogTitle";
import React from "react";
import { render } from "@testing-library/react";

describe("DialogTitle", () => {
  test("title is shown correctly", () => {
    // render basic dialog that includes dialog title component
    const title = "Test dialog title";
    const { baseElement } = render(
      <Dialog fullWidth maxWidth="sm" open>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Example dialog to showcase the dialog title component
          </DialogContentText>
        </DialogContent>
      </Dialog>
    );

    // verify dialog title is correct
    const dialogTitle = baseElement.querySelector(".MuiDialogTitle-root");
    expect(dialogTitle.textContent).toBe(title);
  });

  test("close button is shown when onClose is set", () => {
    // render basic dialog that includes dialog title component
    const title = "Test dialog title";
    const { baseElement } = render(
      <Dialog fullWidth maxWidth="sm" open>
        <DialogTitle onClose={() => console.log("test")}>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Example dialog to showcase the dialog title component
          </DialogContentText>
        </DialogContent>
      </Dialog>
    );

    // verify close button is shown
    const closeButton = baseElement.querySelector(".MuiIconButton-root");
    expect(closeButton).toBeInTheDocument();
  });

  test("close button is not shown when onClose is not set", () => {
    // render basic dialog that includes dialog title component
    const title = "Test dialog title";
    const { baseElement } = render(
      <Dialog fullWidth maxWidth="sm" open>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Example dialog to showcase the dialog title component
          </DialogContentText>
        </DialogContent>
      </Dialog>
    );

    // verify close button is not shown
    const closeButton = baseElement.querySelector(".MuiIconButton-root");
    expect(closeButton).not.toBeInTheDocument();
  });
});
