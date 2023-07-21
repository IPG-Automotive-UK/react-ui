import { render, screen } from "@testing-library/react";

import React from "react";
import ThemeProvider from "../ThemeProvider/ThemeProvider";
import Wizard from "./Wizard";

describe("Wizard", () => {
  it("renders title", () => {
    render(<Wizard title="Wizard Title" />);
    expect(screen.getByText("Wizard Title")).toBeInTheDocument();
  });
  it("renders children", () => {
    render(
      <Wizard>
        <div data-testid="child1">Child 1</div>
        <div data-testid="child2">Child 2</div>
      </Wizard>
    );
    expect(screen.getByTestId("child1")).toBeInTheDocument();
    expect(screen.getByTestId("child2")).toBeInTheDocument();
  });
  it("has a default max width", () => {
    render(
      <ThemeProvider>
        <Wizard title="Wizard Title" />
      </ThemeProvider>
    );
    expect(screen.getByText("Wizard Title")).toHaveStyle("max-width: 1152px");
  });
  it("can set max width", () => {
    render(
      <ThemeProvider>
        <Wizard maxWidth={100} title="Wizard Title" />
      </ThemeProvider>
    );
    expect(screen.getByText("Wizard Title")).toHaveStyle("max-width: 100px");
  });
});
