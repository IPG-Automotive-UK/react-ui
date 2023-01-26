import { render, screen } from "@testing-library/react";

import React from "react";
import WizardStep from "../WizardSteps/WizardStep";
import WizardSteps from "./WizardSteps";

describe("WizardSteps", () => {
  it("should render steps horizontally", () => {
    const { container } = render(
      <WizardSteps activeStep={1}>
        <WizardStep label="Step 1" />
        <WizardStep label="Step 2" />
        <WizardStep label="Step 3" />
      </WizardSteps>
    );
    expect(
      container.querySelector(".MuiStepper-horizontal")
    ).toBeInTheDocument();
  });
  it("should mark the active step", () => {
    render(
      <WizardSteps activeStep={1}>
        <WizardStep label="Step 1" />
        <WizardStep label="Step 2" />
        <WizardStep label="Step 3" />
      </WizardSteps>
    );
    expect(screen.getByText("Step 2")).toHaveClass("Mui-active");
  });
  it("should mark the completed steps", () => {
    render(
      <WizardSteps activeStep={1}>
        <WizardStep label="Step 1" />
        <WizardStep label="Step 2" />
        <WizardStep label="Step 3" />
      </WizardSteps>
    );
    expect(screen.getByText("Step 1")).toHaveClass("Mui-completed");
  });
});
