import { render, screen } from "@testing-library/react";

import NextButton from "./NextButton";
import React from "react";

describe("NextButton", () => {
  it("renders with text", () => {
    render(<NextButton />);
    expect(screen.getByRole("button")).toHaveTextContent("Next");
  });
  it("can be disabled", () => {
    render(<NextButton disabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });
  it("can be clicked", () => {
    const onClick = jest.fn();
    render(<NextButton onClick={onClick} />);
    screen.getByRole("button").click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
