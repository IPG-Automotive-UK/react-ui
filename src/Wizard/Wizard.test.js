import { render, screen } from "@testing-library/react";

import React from "react";
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
});
