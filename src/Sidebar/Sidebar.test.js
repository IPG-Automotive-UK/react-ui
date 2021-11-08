import { render, screen } from "@testing-library/react";
import React from "react";
import Sidebar from "./";

describe("Sidebar", () => {
  it("renders children", () => {
    render(<Sidebar>Child</Sidebar>);
    expect(screen.queryByText("Child")).toBeInTheDocument();
  });
  it("renders app version by default", () => {
    render(<Sidebar appVersion="v1.2.3" />);
    expect(screen.queryByText("v1.2.3")).toBeInTheDocument();
  });
  it("can hide app version", () => {
    render(<Sidebar appVersion="v1.2.3" showVersion={false} />);
    expect(screen.queryByText("v1.2.3")).not.toBeInTheDocument();
  });
  it("renders icon by default", () => {
    const { container } = render(<Sidebar logoSrc="/path/img.png" />);
    expect(
      container.querySelector("img[src='/path/img.png']")
    ).toBeInTheDocument();
  });
  it("can hide icon", () => {
    const { container } = render(
      <Sidebar logoSrc="/path/img.png" showLogo={false} />
    );
    expect(
      container.querySelector("img[src='/path/img.png']")
    ).not.toBeInTheDocument();
  });
});
