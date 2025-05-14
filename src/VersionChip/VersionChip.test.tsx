import "@testing-library/jest-dom";

import { describe, expect, it, vi } from "vitest";
import { render, screen } from "../TestUtils";

import React from "react";
import VersionChip from "./VersionChip";
import { waitFor } from "@testing-library/react";

describe("VersionChip", () => {
  // test that the version chip renders
  it("renders when version is a single digit", () => {
    render(<VersionChip version="1"></VersionChip>);
    expect(screen.getByText("1")).toBeInTheDocument();
  });
  // test that the version chip renders
  it("renders VersionChip", () => {
    render(<VersionChip version="1.0"></VersionChip>);
    expect(screen.getByText("1.0")).toBeInTheDocument();
  });
  // check single digit major version has correct svg
  it("renders major svg, when version is a single digit", () => {
    render(<VersionChip version="1"></VersionChip>);
    expect(screen.getByTestId("LayersIcon")).toBeInTheDocument();
  });
  // check major version has correct svg
  it("renders major svg", () => {
    render(<VersionChip version="1.0"></VersionChip>);
    expect(screen.getByTestId("LayersIcon")).toBeInTheDocument();
  });
  // check nothing is rendered if version format is wrong
  it("doesn't render when version is wrong format", () => {
    // set up spy to intercept and silence console warnings while allowing test verification
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<VersionChip version="1.1.1"></VersionChip>);
    // verify that invalid version format triggered a console warning
    expect(warnSpy).toHaveBeenCalled();
    // restore original console.warn to prevent affecting other tests
    warnSpy.mockRestore();
    expect(screen.queryByText("1.1.1")).not.toBeInTheDocument();
  });
  // check minor version has correct svg
  it("renders minor svg", () => {
    render(<VersionChip version="1.1"></VersionChip>);
    expect(screen.getByTestId("AccountTreeIcon")).toBeInTheDocument();
  });

  // check background color when the `selected` prop is true
  it("applies correct background color when `selected` is true", () => {
    render(<VersionChip version="1.0" selected={true} />);
    const chipElement = screen.getByTestId("version-chip");
    expect(chipElement).toHaveStyle({
      borderColor: expect.stringContaining("var(--ipg-palette-primary-main)")
    });
    expect(chipElement).toHaveStyle({
      backgroundColor: expect.stringContaining(
        "color-mix(in srgb, var(--ipg-palette-info) 12%, transparent)"
      )
    });
  });

  // check background color when the `selected` prop is false
  it("applies correct background color when `selected` is false", () => {
    render(<VersionChip version="1.0" selected={false} />);
    const chipElement = screen.getByTestId("version-chip");
    expect(chipElement).toHaveStyle({
      borderColor: expect.stringContaining(
        "color-mix(in srgb, var(--ipg-palette-divider) 23%, transparent)"
      )
    });
    expect(chipElement).toHaveStyle({
      backgroundColor: expect.stringContaining(
        "var(--ipg-palette-background-default)"
      )
    });
  });

  // check if warning is logged for invalid version format
  it("logs a warning for an invalid version format", async () => {
    // mock console.warn to detect if a warning is logged
    const consoleWarnMock = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    render(<VersionChip version="invalid-version" />);

    await waitFor(() => {
      expect(consoleWarnMock).toHaveBeenCalledWith(
        'Invalid version format: "invalid-version". Expected format is "<major>" or <major>.<minor>" (e.g., "1" or "1.0").'
      );
    });
    consoleWarnMock.mockRestore();
  });
});
