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
  it("has empty logo link href on default", () => {
    const { container } = render(<Sidebar />);
    expect(container.querySelector("a")).not.toBeInTheDocument();
  });
  it("has a valid logo link href if a string is provided", () => {
    const { container } = render(
      <Sidebar logoLinkUrl={"https://www.some.url/"} />
    );
    expect(
      container.querySelector("a[href='https://www.some.url/']")
    ).toBeInTheDocument();
  });
});
