import { render, screen } from "@testing-library/react";

import React from "react";
import WizardActions from "./WizardActions";

describe("WizardActions", () => {
  it("renders", () => {
    render(<WizardActions />);
    expect(screen.getByRole("toolbar")).toBeInTheDocument();
  });
  it("renders children", () => {
    render(
      <WizardActions>
        <div data-testid="child1">Child 1</div>
        <div data-testid="child2">Child 2</div>
      </WizardActions>
    );
    expect(screen.getByTestId("child1")).toBeInTheDocument();
    expect(screen.getByTestId("child2")).toBeInTheDocument();
  });
  it("is a row flexbox", () => {
    render(<WizardActions />);
    expect(screen.getByRole("toolbar")).toHaveStyle({
      display: "flex",
      flexDirection: "row"
    });
  });
});
