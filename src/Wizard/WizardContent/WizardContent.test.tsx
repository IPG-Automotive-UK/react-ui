import { render, screen } from "@testing-library/react";

import React from "react";
import ThemeProvider from "../../ThemeProvider";
import WizardContent from "./WizardContent";

describe("WizardContent", () => {
  it("has a max width when themed", () => {
    render(
      <ThemeProvider>
        <WizardContent />
      </ThemeProvider>
    );
    expect(screen.getByRole("region")).toHaveStyle({
      maxWidth: "1152px"
    });
  });
  it("has no max width when not themed", () => {
    render(<WizardContent />);
    expect(screen.getByRole("region")).toHaveStyle({
      maxWidth: undefined
    });
  });
  it("renders children", () => {
    render(
      <WizardContent>
        <div data-testid="child1">Child 1</div>
        <div data-testid="child2">Child 2</div>
      </WizardContent>
    );
    expect(screen.getByTestId("child1")).toBeInTheDocument();
    expect(screen.getByTestId("child2")).toBeInTheDocument();
  });
});
