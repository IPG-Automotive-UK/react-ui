import { render, screen } from "@testing-library/react";

import React from "react";
import Sidebar from "./";

describe("Sidebar", () => {
  it("renders children", () => {
    render(<Sidebar>Child</Sidebar>);
    expect(screen.queryByText("Child")).toBeInTheDocument();
  });
  it("renders app version by default", () => {
    render(<Sidebar appVersion="1.2.3" />);
    expect(screen.queryByText("1.2.3")).toBeInTheDocument();
  });
  it("can hide app version", () => {
    render(<Sidebar appVersion="1.2.3" showVersion={false} />);
    expect(screen.queryByText("1.2.3")).not.toBeInTheDocument();
  });
  it("can hide icon", () => {
    const { container } = render(<Sidebar showLogo={false} />);
    expect(
      container.querySelector("img[src='/path/img.png']")
    ).not.toBeInTheDocument();
  });
});
