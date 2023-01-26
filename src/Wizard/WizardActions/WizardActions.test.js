import { render, screen } from "@testing-library/react";

import React from "react";
import WizardActions from "./WizardActions";

describe("WizardActions", () => {
  it("renders", () => {
    render(<WizardActions />);
    expect(screen.getByRole("toolbar")).toBeInTheDocument();
  });
  it("is a row flexbox", () => {
    render(<WizardActions />);
    expect(screen.getByRole("toolbar")).toHaveStyle({
      display: "flex",
      flexDirection: "row"
    });
  });
});
