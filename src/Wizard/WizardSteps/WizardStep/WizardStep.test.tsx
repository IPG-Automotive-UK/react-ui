import { render, screen } from "@testing-library/react";

import React from "react";
import WizardStep from "./WizardStep";
import userEvent from "@testing-library/user-event";

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
  it("should show tooltip on hover when helperText exceeds 30 characters", async () => {
    const longHelperText =
      "This helper text exceeds the thirty character limit.";
    render(<WizardStep label="Step 1" helperText={longHelperText} />);

    // Truncated text should be in the document
    expect(
      screen.getByText(longHelperText.slice(0, 30) + "...")
    ).toBeInTheDocument();

    const tooltipTrigger = screen.getByText(
      longHelperText.slice(0, 30) + "..."
    );

    // Simulate hover
    await userEvent.hover(tooltipTrigger);

    // Wait for tooltip content to appear
    expect(await screen.findByRole("tooltip")).toHaveTextContent(
      longHelperText
    );
  });
});
