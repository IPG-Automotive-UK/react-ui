import * as React from "react";

import {
  Step,
  StepContextType,
  StepLabel,
  StepLabelProps,
  SvgIcon,
  Typography,
  useStepContext
} from "@mui/material";

import { Error } from "@mui/icons-material";
import { WizardStepProps } from "./WizardStep.types";

/**
 * The WizardStep component allows you to create a multi-step form stepper.
 * See also the WizardSteps component.
 */
export default function WizardStep({
  label,
  completed = false,
  index,
  last,
  helperText,
  errorText
}: WizardStepProps) {
  return (
    <Step completed={completed} index={index} last={last}>
      <WizardStepLabel
        label={label}
        helperText={helperText}
        errorText={errorText}
      />
    </Step>
  );
}

/**
 * The WizardStepLabel is a helper component for the WizardStep component. It provides functionality for the helperText and errorText props. It is a separate component so that it can be used in the MUI Step component and hence access the context state.
 */
function WizardStepLabel({
  label,
  helperText,
  errorText
}: Pick<WizardStepProps, "label" | "helperText" | "errorText">) {
  // get context state
  const { active, completed } = useStepContext() as StepContextType;

  // support string helper text with default typography
  if (helperText && typeof helperText === "string") {
    helperText = (
      <Typography
        variant="caption"
        color={active || completed ? "textPrimary" : "inherit"}
      >
        {helperText}
      </Typography>
    );
  }

  // stepLabelProps
  const stepLabelProps: StepLabelProps = {
    optional: helperText
  };

  // errorText overrides helperText
  if (errorText) {
    stepLabelProps.optional = errorText;
    stepLabelProps.error = true;
    stepLabelProps.icon = (
      <SvgIcon component={Error} color="error" fontSize="medium" />
    );
  }

  // render
  return <StepLabel {...stepLabelProps}>{label}</StepLabel>;
}
