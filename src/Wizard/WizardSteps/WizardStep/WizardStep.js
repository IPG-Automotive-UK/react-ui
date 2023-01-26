import * as React from "react";

import {
  Step,
  StepLabel,
  SvgIcon,
  Typography,
  useStepContext
} from "@mui/material";

import { Error } from "@mui/icons-material";
import PropTypes from "prop-types";

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
}) {
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

// prop types
WizardStep.propTypes = {
  /**
   * If true, the step is marked as completed. Is normally set by the WizardSteps parent component.
   */
  completed: PropTypes.bool,
  /**
   * The error text to display.
   * If this prop is set, the helperText prop is ignored.
   */
  errorText: PropTypes.node,
  /**
   * The helper text to display.
   * If the errorText prop is set, this prop is ignored.
   */
  helperText: PropTypes.node,
  /**
   * The index of the step. Normally set by the WizardSteps parent component.
   */
  index: PropTypes.number,
  /**
   * The label displayed in the step icon.
   */
  label: PropTypes.string.isRequired,
  /**
   * If true, the step is marked as last. Normally set by the WizardSteps parent component.
   */
  last: PropTypes.bool
};

/**
 * The WizardStepLabel is a helper component for the WizardStep component. It provides functionality for the helperText and errorText props. It is a separate component so that it can be used in the MUI Step component and hence access the context state.
 */
function WizardStepLabel({ label, helperText, errorText }) {
  // get context state
  const { active, completed } = useStepContext();

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
  const stepLabelProps = {
    optional: helperText
  };

  // errorText overrides helperText
  if (errorText) {
    stepLabelProps.optional = errorText;
    stepLabelProps.error = true;
    stepLabelProps.icon = (
      <SvgIcon color="error" fontSize="medium" as={Error} />
    );
  }

  // render
  return <StepLabel {...stepLabelProps}>{label}</StepLabel>;
}
