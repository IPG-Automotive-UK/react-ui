import { render, screen } from "@testing-library/react";

import React from "react";
import { Status } from "../statuses.types";
import { StatusCountBar } from "./StatusCountBar";

describe("StatusCountBar", () => {
  /* eslint-disable sort-keys */
  const defaultProps = {
    title: "Total Simulations",
    count: {
      running: 2,
      completed: 3,
      aborted: 1
    } as Record<Status, number>
  };
  /* eslint-enable sort-keys */

  test("should render the status bar with the correct test ids", () => {
    render(<StatusCountBar {...defaultProps} />);

    // Assert that the status bar is rendered with proper count and title
    expect(screen.getByTestId("status-bar-running")).toBeInTheDocument();
    expect(screen.getByTestId("status-bar-completed")).toBeInTheDocument();
    expect(screen.getByTestId("status-bar-aborted")).toBeInTheDocument();
  });

  // Width calculation based on count
  test("should render the status bars with the correct width percentages", () => {
    render(<StatusCountBar {...defaultProps} />);

    const totalCount = 6; // 2 (running) + 3 (completed) + 1 (aborted)
    const runningBar = screen.getByTestId("status-bar-running");
    const completedBar = screen.getByTestId("status-bar-completed");
    const abortedBar = screen.getByTestId("status-bar-aborted");

    // Check the width style applied to the status bars
    expect(runningBar).toHaveStyle(`width: ${(2 / totalCount) * 100}%`);
    expect(completedBar).toHaveStyle(`width: ${(3 / totalCount) * 100}%`);
    expect(abortedBar).toHaveStyle(`width: ${(1 / totalCount) * 100}%`);
  });
});
