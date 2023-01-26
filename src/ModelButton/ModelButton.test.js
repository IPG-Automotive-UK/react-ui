import { render, screen } from "@testing-library/react";

import ModelButton from "./ModelButton";
import React from "react";

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
    const onClick = jest.fn();
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

  // test status none is correctly set
  test("sets status none", () => {
    render(<ModelButton status="none" />);
    const button = screen.getByTestId("model-button");
    const styles = window.getComputedStyle(button);
    expect(styles.border).toBe("2px solid rgba(0, 0, 0, 0.6)");
  });

  // test status error is correctly set
  test("sets status error", () => {
    render(<ModelButton status="error" />);
    const button = screen.getByTestId("model-button");
    const styles = window.getComputedStyle(button);
    expect(styles.border).toBe("2px solid #d32f2f");
  });

  // test status warning is correctly set
  test("sets status warning", () => {
    render(<ModelButton status="warning" />);
    const button = screen.getByTestId("model-button");
    const styles = window.getComputedStyle(button);
    expect(styles.border).toBe("2px solid #ed6c02");
  });

  // test status success is correctly set
  test("sets status success", () => {
    render(<ModelButton status="success" />);
    const button = screen.getByTestId("model-button");
    const styles = window.getComputedStyle(button);
    expect(styles.border).toBe("2px solid #2e7d32");
  });
});
