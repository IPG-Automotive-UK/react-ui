import { render, screen } from "@testing-library/react";
import Loading from "./Loading";
import React from "react";

/**
 * Tests
 */
describe("Loading", () => {
  test("can set the label", () => {
    const newLabel = "This is a test";
    render(<Loading label={newLabel} />);
    expect(screen.getByText(newLabel));
  });
});
