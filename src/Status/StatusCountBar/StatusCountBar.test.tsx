import { render, screen } from "@testing-library/react";

import React from "react";
import StatusCountBar from "./StatusCountBar";

// Mock the statuses config with colors for testing
// jest.mock("../statuses", () => ({
//   running: { icon: { color: "blue" } },
//   completed: { icon: { color: "green" } },
//   aborted: { icon: { color: "red" } }
// }));

// /* eslint-disable sort-keys */
// const mockCount = {
//   running: 2,
//   completed: 3,
//   //   aborted: 1
//   cancelled: 1
// };
// /* eslint-enable sort-keys */

describe("StatusCountBar", () => {
  /* eslint-disable sort-keys */
  const defaultProps = {
    title: "Total Simulations",
    count: {
      running: 2,
      completed: 3,
      aborted: 1
    }
  };
  /* eslint-enable sort-keys */
  test("should render the status bar with the correct title and counts", () => {
    render(<StatusCountBar {...defaultProps} />);

    // Assert that the status bar is rendered with proper count and title
    expect(screen.getByTitle("running: 2")).toBeInTheDocument();
    expect(screen.getByTitle("completed: 3")).toBeInTheDocument();
    expect(screen.getByTitle("aborted: 1")).toBeInTheDocument();
  });

  // Test 2: Width calculation based on count
  test("should render the status bars with the correct width percentages", () => {
    render(<StatusCountBar {...defaultProps} />);

    const totalCount = 6; // 2 (running) + 3 (completed) + 1 (aborted)
    const runningBar = screen.getByTitle("running: 2");
    const completedBar = screen.getByTitle("completed: 3");
    const abortedBar = screen.getByTitle("aborted: 1");

    // Check the width style applied to the status bars
    expect(runningBar).toHaveStyle(`width: ${(2 / totalCount) * 100}%`);
    expect(completedBar).toHaveStyle(`width: ${(3 / totalCount) * 100}%`);
    expect(abortedBar).toHaveStyle(`width: ${(1 / totalCount) * 100}%`);
  });
});
