import { render, screen } from "@testing-library/react";
import Copyright from "./";
import React from "react";

describe("Copyright", () => {
  it("display current year", () => {
    render(<Copyright />);
    const found = screen.getByText(String(new Date().getFullYear()), {
      exact: false
    });
    expect(found).toBeTruthy();
  });
  it("links to IPG website", () => {
    render(<Copyright />);
    expect(screen.getByText("IPG Automotive").closest("a")).toHaveAttribute(
      "href",
      "https://ipg-automotive.com/"
    );
  });
});
