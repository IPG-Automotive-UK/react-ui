import { AddOutlined, AddToQueue } from "@mui/icons-material";
import { render, screen } from "@testing-library/react";

import { Button } from "@mui/material";
import EmptyState from "./EmptyState";
import React from "react";

// A set of default inputs so tests can change what they're testing
const defaultInputs = {
  actions: [
    <Button key="default-action" variant="contained" size="large">
      Default Action
    </Button>
  ],
  icon: <AddToQueue data-testid="default-icon" />,
  subtitle: "Default Subtitle",
  title: "Default Title"
};

// tests for the empty state component
describe("EmptyState", () => {
  test("should display title when provided", () => {
    render(<EmptyState {...defaultInputs} title="Test Title" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  test("should display subtitle when provided", () => {
    render(<EmptyState {...defaultInputs} subtitle="Test Subtitle" />);
    expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
  });

  test("should display icon when provided", () => {
    render(<EmptyState {...defaultInputs} />);
    expect(screen.getByTestId("default-icon")).toBeInTheDocument();
  });

  test("should display action button when provided", () => {
    render(<EmptyState {...defaultInputs} />);
    expect(
      screen.getByRole("button", { name: "Default Action" })
    ).toBeInTheDocument();
  });

  test("should display multiple action buttons when provided", () => {
    render(
      <EmptyState
        {...defaultInputs}
        actions={[
          <Button key="action1" variant="outlined" size="large">
            Action 1
          </Button>,
          <Button key="action2" variant="contained" size="large">
            Action 2
          </Button>
        ]}
      />
    );
    expect(
      screen.getByRole("button", { name: "Action 1" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Action 2" })
    ).toBeInTheDocument();
  });

  test("should display correctly without title", () => {
    const { title, ...inputsWithoutTitle } = defaultInputs;
    render(<EmptyState {...inputsWithoutTitle} />);
    expect(screen.queryByText("Default Title")).not.toBeInTheDocument();
    expect(screen.getByText("Default Subtitle")).toBeInTheDocument();
  });

  test("should display correctly without actions", () => {
    const { actions, ...inputsWithoutActions } = defaultInputs;
    render(<EmptyState {...inputsWithoutActions} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(screen.getByText("Default Title")).toBeInTheDocument();
  });

  test("should display complex icon with image", () => {
    render(
      <EmptyState
        {...defaultInputs}
        icon={<img src="test-image.svg" alt="Test" data-testid="image-icon" />}
      />
    );
    expect(screen.getByTestId("image-icon")).toBeInTheDocument();
    expect(screen.getByAltText("Test")).toBeInTheDocument();
  });

  test("should display button with icon", () => {
    render(
      <EmptyState
        {...defaultInputs}
        actions={[
          <Button key="icon-button" variant="outlined" size="large">
            <AddOutlined data-testid="button-icon" />
            Icon Button
          </Button>
        ]}
      />
    );
    expect(screen.getByTestId("button-icon")).toBeInTheDocument();
    expect(screen.getByText("Icon Button")).toBeInTheDocument();
  });
});
