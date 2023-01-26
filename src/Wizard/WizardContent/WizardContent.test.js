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
      maxWidth: "945px"
    });
  });
  it("has no max width when not themed", () => {
    render(<WizardContent />);
    expect(screen.getByRole("region")).toHaveStyle({
      maxWidth: undefined
    });
  });
});
