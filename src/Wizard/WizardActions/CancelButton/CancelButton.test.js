import { render, screen } from "@testing-library/react";

import CancelButton from "./CancelButton";
import React from "react";

describe("CancelButton", () => {
  it("renders with text", () => {
    render(<CancelButton />);
    expect(screen.getByRole("button")).toHaveTextContent("Cancel");
  });
  it("can be disabled", () => {
    render(<CancelButton disabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });
  it("can be clicked", () => {
    const onClick = jest.fn();
    render(<CancelButton onClick={onClick} />);
    screen.getByRole("button").click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
