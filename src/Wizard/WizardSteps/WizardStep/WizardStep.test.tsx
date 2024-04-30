import { render, screen } from "@testing-library/react";

import React from "react";
import WizardStep from "./WizardStep";

describe("WizardStep", () => {
  it("should render the label", () => {
    render(<WizardStep label="Step 1" />);
    expect(screen.getByText("Step 1")).toBeInTheDocument();
  });
  it("should render the helperText", () => {
    render(<WizardStep label="Step 1" helperText="Step 1 helper text" />);
    expect(screen.getByText("Step 1 helper text")).toBeInTheDocument();
  });
  it("should render an error icon when an error boolean is provided", () => {
    render(
      <WizardStep label="Step 1" error={true} helperText="Step 1 error text" />
    );
    expect(screen.getByTestId("ErrorIcon")).toBeInTheDocument();
    expect(screen.getByText("Step 1")).toHaveClass("Mui-error");
  });
});
