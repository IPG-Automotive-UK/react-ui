import { describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import React from "react";
import VersionChip from "./VersionChip";

describe("VersionChip", () => {
  // test that the version chip renders
  it("renders VersionChip", () => {
    render(<VersionChip version="1.0"></VersionChip>);
    expect(screen.getByText("1.0")).toBeInTheDocument();
  });
  // check major version has correct svg
  it("renders major svg", () => {
    render(<VersionChip version="1.0"></VersionChip>);
    expect(screen.getByTestId("LayersIcon")).toBeInTheDocument();
  });
  // check nothing is rendered if version wrong format
  it("doesn't render when version is wrong format", () => {
    render(<VersionChip version="1.1.1"></VersionChip>);
    expect(screen.queryByText("1.1.1")).not.toBeInTheDocument();
  });
  // check minor version has correct svg
  it("renders minor svg", () => {
    render(<VersionChip version="1.1"></VersionChip>);
    expect(screen.getByTestId("AccountTreeIcon")).toBeInTheDocument();
  });
});
