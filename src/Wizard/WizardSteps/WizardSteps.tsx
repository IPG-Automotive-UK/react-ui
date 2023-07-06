import * as React from "react";

import { Stepper } from "@mui/material";
import { WizardStepProps } from "./WizardStep/WizardStep.types";
import { WizardStepsProps } from "./WizardSteps.types";

/**
 * The WizardSteps component allows you to create a multi-step form stepper.
 * See also the WizardStep component.
 */
export default function WizardSteps({
  children,
  activeStep
}: WizardStepsProps) {
  // clone the children and set the completed prop assuming that all steps before the active step are completed
  children = React.Children.map(children, (child, index) => {
    return React.cloneElement(
      child as React.ReactElement<React.PropsWithChildren<WizardStepProps>>,
      {
        completed: index < activeStep
      }
    );
  });

  // render
  // note that the Stepper component sets a number of props on the children e.g. index, last
  return (
    <Stepper
      activeStep={activeStep}
      sx={{
        boxSizing: "border-box",
        maxWidth: theme => theme?.layout?.content?.maxWidth,
        mb: 3,
        mx: "auto",
        p: 3,
        width: "100%"
      }}
    >
      {children}
    </Stepper>
  );
}
