import * as React from "react";

import {
  Step,
  StepLabel,
  StepLabelProps,
  SvgIcon,
  Typography,
  useStepContext
} from "@mui/material";

import { Error as ErrorIcon } from "@mui/icons-material";
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
  error,
  errorText
}: WizardStepProps) {
  return (
    <Step completed={completed} index={index} last={last}>
      <WizardStepLabel
        label={label}
        helperText={helperText}
        error={error}
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
  error,
  errorText
}: Pick<WizardStepProps, "label" | "helperText" | "error" | "errorText">) {
  // get context state
  const stepContext = useStepContext();
  let active: boolean, completed: boolean;
  if ("completed" in stepContext && "active" in stepContext) {
    active = stepContext.active;
    completed = stepContext.completed;
  } else {
    throw new Error(
      "WizardStepLabel must be used within a WizardStep component."
    );
  }

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
  }

  if (error || errorText) {
    stepLabelProps.error = true;
    stepLabelProps.icon = (
      <SvgIcon component={ErrorIcon} color="error" fontSize="medium" />
    );
  }

  // render
  return <StepLabel {...stepLabelProps}>{label}</StepLabel>;
}
