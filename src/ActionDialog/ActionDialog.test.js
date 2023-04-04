import { render, screen } from "@testing-library/react";

import ActionDialog from "./ActionDialog";
import React from "react";
import { Typography } from "@mui/material";

// a set of default inputs so that tests can change what theyre testing
const defaultInputs = {
  content: <Typography>Content goes here</Typography>,
  onCancelClick: jest.fn(),
  onSaveClick: jest.fn()
};

// Tests
describe("ActionDialog", () => {
  test("should render dialog", () => {
    render(<ActionDialog {...defaultInputs} open={true} />);
    const dialogElement = screen.getByTestId("action-dialog");
    expect(dialogElement).toBeInTheDocument();
  });
  test("test dialog title shown", () => {
    render(<ActionDialog {...defaultInputs} open={true} title="Some title" />);
    expect(screen.getByText("Some title")).toBeInTheDocument();
  });
  test("test dialog content shown", () => {
    render(
      <ActionDialog
        {...defaultInputs}
        open={true}
        content={<Typography>Content goes here</Typography>}
      />
    );
    expect(screen.getByText("Content goes here")).toBeInTheDocument();
  });
  test("test dialog cancel button shown", () => {
    render(<ActionDialog {...defaultInputs} open={true} cancelText="cancel" />);
    expect(screen.getByText("cancel")).toBeInTheDocument();
  });
  test("test dialog save button shown", () => {
    render(<ActionDialog {...defaultInputs} open={true} saveText="Save" />);
    expect(screen.getByText("Save")).toBeInTheDocument();
  });
  test("test dialog save button disabled", () => {
    render(<ActionDialog {...defaultInputs} open={true} saveEnabled={true} />);
    expect(screen.getByText("Save")).toBeDisabled();
  });
  test("test dialog save button enabled", () => {
    render(<ActionDialog {...defaultInputs} open={true} saveEnabled={false} />);
    expect(screen.getByText("Save")).toBeEnabled();
  });
  test("test dialog cancel button click", () => {
    render(<ActionDialog {...defaultInputs} open={true} />);
    screen.getByText("cancel").click();
    expect(defaultInputs.onCancelClick).toHaveBeenCalled();
  });
  test("test dialog save button click", () => {
    render(<ActionDialog {...defaultInputs} open={true} />);
    screen.getByText("Save").click();
    expect(defaultInputs.onSaveClick).toHaveBeenCalled();
  });
  test("test dialog width", () => {
    render(<ActionDialog {...defaultInputs} open={true} width="400px" />);
    expect(screen.getByTestId("action-dialog")).toHaveClass("MuiDialog-root");
  });
});
