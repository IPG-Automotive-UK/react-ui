import { render, screen } from "@testing-library/react";

import LabelChip from "./LabelChip";
import React from "react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

describe("LabelChip", () => {
  // test that the label chip renders
  it("renders label", () => {
    render(<LabelChip label="Label" />);
    expect(screen.getByText(/label/i)).toBeInTheDocument();
  });
  // test that the label chip renders with a custom color
  it("renders custom color", () => {
    render(<LabelChip label="Label" color="#46eb34" />);

    // get the label chip
    const labelChip = screen.getByText(/label/i).parentElement;

    // check the background color - we check the parent element because the chip itself is the no wrap typography component
    expect(labelChip?.parentNode).toHaveStyle("background-color: #46eb34");
  });
  // test that the label chip renders with a small size
  it("renders small size", () => {
    render(<LabelChip label="Label" size="small" />);
    // get the label chip
    const labelChip = screen.getByText(/label/i).parentElement;

    // check the font size - we check the parent element because the chip itself is the no wrap typography component
    expect(labelChip?.parentNode).toHaveClass("MuiChip-sizeSmall");
  });
  // test that the label chip renders with a outlined variant
  it("renders outlined variant", () => {
    render(<LabelChip label="Label" variant="outlined" />);

    // get the label chip
    const labelChip = screen.getByText(/label/i).parentElement;

    // check that the label chip has the outlined class - we check the parent element because the chip itself is the no wrap typography component
    expect(labelChip?.parentNode).toHaveClass("MuiChip-outlined");
  });
  // test that on click, the callback is called
  it("calls callback onClick", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<LabelChip label="Label" onClick={onClick} clickable />);
    await user.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalled();
  });
  // test that on click, the callback is not called when not clickable
  it("does not call callback onClick when not clickable", () => {
    render(<LabelChip label="Label" onClick={() => {}} />);

    // there shouldn't be a button role
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
  // test that on delete, the callback is called
  it("calls callback onDelete", async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();
    render(<LabelChip label="Label" onDelete={onDelete} />);

    // find the cancel icon by data-testid
    const cancelIcon = screen.getByTestId("CancelIcon");

    // click the cancel icon
    await user.click(cancelIcon);

    // check that the onDelete callback was called
    expect(onDelete).toHaveBeenCalled();
  });
  // test that the delete icon is not rendered when onDelete is not passed
  it("does not render delete icon when onDelete is not passed", () => {
    render(<LabelChip label="Label" />);

    // there shouldn't be a cancel icon
    expect(screen.queryByTestId("CancelIcon")).not.toBeInTheDocument();
  });
});
