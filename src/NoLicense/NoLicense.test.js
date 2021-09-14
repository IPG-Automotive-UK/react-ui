import { render, screen } from "@testing-library/react";
import NoLicense from "./NoLicense";
import React from "react";

/**
 * Tests
 */
describe("NoLicense", () => {
  test("can set header", () => {
    const newHeader = "This is a test";
    render(<NoLicense labelHeader={newHeader} />);
    expect(screen.getByText(newHeader));
  });

  test("can set labels", () => {
    const newHeader = "This is new header label";
    const newBody = "This is new body label";
    render(<NoLicense labelHeader={newHeader} labelBody={newBody} />);
    expect(screen.getByText(newHeader, newBody));
  });
});
