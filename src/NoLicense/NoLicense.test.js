import { render, screen } from "@testing-library/react";
import NoLicense from "./NoLicense";
import React from "react";

/**
 * Tests
 */
describe("NoLicense", () => {
  test("can set header", () => {
    const newTitle = "This is a test";
    render(<NoLicense title={newTitle} />);
    expect(screen.getByText(newTitle));
  });

  test("can set labels", () => {
    const newTitle = "This is new header label";
    const newDescription = "This is new body label";
    render(<NoLicense title={newTitle} description={newDescription} />);
    expect(screen.getByText(newTitle, newDescription));
  });
});
