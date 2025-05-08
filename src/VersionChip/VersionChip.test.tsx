import "@testing-library/jest-dom";

import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";

import React from "react";
import VersionChip from "./VersionChip";

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
    // suppress expected console warning during test for invalid version format
    vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<VersionChip version="1.1.1"></VersionChip>);
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
    const styles = window.getComputedStyle(chipElement);
    // passing resolved color from alpha(theme.palette.info.main, 0.12) and theme.palette.primary.main
    expect(styles.backgroundColor).toBe("rgba(2, 136, 209, 0.12)");
    expect(styles.border).toBe("1px solid #1976d2");
  });

  // check background color when the `selected` prop is false
  it("applies correct background color when `selected` is false", () => {
    render(<VersionChip version="1.0" selected={false} />);
    const chipElement = screen.getByTestId("version-chip");
    const styles = window.getComputedStyle(chipElement);
    // resolved color from alpha(theme.palette.divider, 0.23) and theme.palette.background.default
    expect(styles.backgroundColor).toBe("rgb(255, 255, 255)");
    expect(styles.border).toBe("1px solid rgba(0, 0, 0, 0.23)");
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
