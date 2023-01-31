import { render, screen } from "@testing-library/react";

import BackButton from "./BackButton";
import React from "react";

describe("BackButton", () => {
  it("renders with text", () => {
    render(<BackButton />);
    expect(screen.getByRole("button")).toHaveTextContent("Back");
  });
  it("can be disabled", () => {
    render(<BackButton disabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });
  it("can be clicked", () => {
    const onClick = jest.fn();
    render(<BackButton onClick={onClick} />);
    screen.getByRole("button").click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
