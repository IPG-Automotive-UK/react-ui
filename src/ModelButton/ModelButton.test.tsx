import { render, screen } from "../TestUtils";

import ModelButton from "./ModelButton";
import React from "react";
import { alpha } from "@mui/material";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

/**
 * Tests for model button component
 */
describe("ModelButton", () => {
  // test label is correctly shown
  test("shows label", () => {
    render(<ModelButton label="Test label" />);
    expect(screen.getByText("Test label")).toBeInTheDocument();
  });

  // test onClick is called when button is clicked
  test("calls onClick when clicked", () => {
    const onClick = vi.fn();
    render(<ModelButton onClick={onClick} />);
    const button = screen.getByRole("button");
    button.click();
    expect(onClick).toHaveBeenCalled();
  });

  // test icon is correctly shown
  test("shows icon", () => {
    render(<ModelButton icon={<div data-testid="test-icon" />} />);
    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
  });

  // test disabled is correctly set
  test("sets disabled", () => {
    render(<ModelButton disabled={true} />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  // test status is correctly set
  test.each([
    ["none", "var(--ipg-palette-text-secondary)"],
    ["error", "var(--ipg-palette-error-main)"],
    ["warning", "var(--ipg-palette-warning-main)"],
    ["success", "var(--ipg-palette-success-main)"]
  ] as const)("sets status %s", (status, strokeVar) => {
    render(<ModelButton status={status} />);
    const svgElement = screen.getByTestId("background");
    expect(svgElement).toHaveAttribute(
      "stroke",
      expect.stringContaining(strokeVar)
    );
    expect(svgElement).toHaveAttribute("stroke-width", "2");
  });

  // test when no status property applied, icon is not rendered
  test("does show status icon", () => {
    render(<ModelButton />);
    const successIcon = screen.queryByTestId("success-icon");
    const warningIcon = screen.queryByTestId("warning-icon");
    const errorIcon = screen.queryByTestId("error-icon");
    expect(successIcon).not.toBeInTheDocument();
    expect(warningIcon).not.toBeInTheDocument();
    expect(errorIcon).not.toBeInTheDocument();
  });

  // test status icon is correctly set
  test.each([
    ["error", "error-icon"],
    ["warning", "warning-icon"],
    ["success", "success-icon"]
  ] as const)(
    "renders correct status icon based on the status",
    (status, icon) => {
      render(<ModelButton status={status} />);
      const currentStatusIcon = screen.getByTestId(`${status}-icon`);
      expect(currentStatusIcon).toBeInTheDocument();
      expect(currentStatusIcon.getAttribute("data-testid")).toEqual(icon);
    }
  );

  // test background is correctly set to IconButton when status is other than 'none'
  test.each([
    ["error", "rgba(211, 47, 47)"],
    ["warning", "rgb(237, 108, 2)"],
    ["success", "rgb(46, 125, 50)"]
  ] as const)(
    "renders correct background based on the status",
    (status, color) => {
      render(<ModelButton status={status} />);
      const svgElement = screen.getByTestId("background");
      expect(svgElement).toHaveAttribute("fill", alpha(color, 0.04));
    }
  );

  // test when no status property is passed, status background is not added to icon button
  test.each([
    ["rgba(211, 47, 47)"],
    ["rgb(237, 108, 2)"],
    ["rgb(46, 125, 50)"]
  ] as const)(
    "does not apply one of the status backgrounds color to the svg fill",
    color => {
      render(<ModelButton />);
      const svgElement = screen.queryByTestId("background");
      expect(svgElement).toBeInTheDocument();
      expect(svgElement).not.toHaveAttribute("fill", alpha(color, 0.04));
    }
  );

  // test that popup button is not shown when no children are provided
  test("does not show popup button when no children are provided", () => {
    render(<ModelButton />);
    const popupButton = screen.queryByTestId("popup-button");
    expect(popupButton).not.toBeInTheDocument();
  });

  // test that popup button is shown when single child is provided
  test("shows popup button when single child provided", () => {
    render(
      <ModelButton>
        <ModelButton />
      </ModelButton>
    );
    const popupButton = screen.queryByTestId("popup-button");
    expect(popupButton).toBeInTheDocument();
  });

  // test that popup button is shown when multiple children are provided
  test("shows popup button when multiple children provided", () => {
    render(
      <ModelButton>
        <ModelButton />
        <ModelButton />
        <ModelButton />
      </ModelButton>
    );
    const popupButton = screen.queryByTestId("popup-button");
    expect(popupButton).toBeInTheDocument();
  });

  // test that children are shown when popup button is clicked
  test("shows children when popup button is clicked", async () => {
    render(
      <ModelButton label="Parent Model">
        <ModelButton label="Child Model 1" />
        <ModelButton label="Child Model 2" />
        <ModelButton label="Child Model 3" />
      </ModelButton>
    );
    const popupButton = screen.queryByTestId("popup-button");
    if (!popupButton) {
      throw new Error("Popup button not found");
    }
    await userEvent.click(popupButton);
    const children = screen.queryAllByTestId("model-button");
    expect(children.length).toBe(4); // 3 children + 1 parent
    expect(screen.getByText("Child Model 1")).toBeInTheDocument();
    expect(screen.getByText("Child Model 2")).toBeInTheDocument();
    expect(screen.getByText("Child Model 3")).toBeInTheDocument();
  });
});
