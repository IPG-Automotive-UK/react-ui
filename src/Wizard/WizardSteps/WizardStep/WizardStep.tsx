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
  error
}: WizardStepProps) {
  return (
    <Step completed={completed} index={index} last={last}>
      <WizardStepLabel label={label} helperText={helperText} error={error} />
    </Step>
  );
}

/**
 * The WizardStepLabel is a helper component for the WizardStep component. It provides functionality for the helperText and errorText props. It is a separate component so that it can be used in the MUI Step component and hence access the context state.
 */
function WizardStepLabel({
  label,
  helperText,
  error
}: Pick<WizardStepProps, "label" | "helperText" | "error">) {
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

  // Initialize step label props
  const stepLabelProps: StepLabelProps = {};

  // Set optional node for helper text
  if (helperText) {
    let textColor = "inherit";

    if (error) {
      textColor = "error";
    } else if (active || completed) {
      textColor = "textPrimary";
    }

    stepLabelProps.optional = (
      <Typography variant="caption" color={textColor}>
        {helperText}
      </Typography>
    );
  }

  // Set error icon
  if (error) {
    stepLabelProps.error = true;
    stepLabelProps.icon = (
      <SvgIcon component={ErrorIcon} color="error" fontSize="medium" />
    );
  }

  // render
  return <StepLabel {...stepLabelProps}>{label}</StepLabel>;
}
