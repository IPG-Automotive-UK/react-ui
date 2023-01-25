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

export default function WizardStepperStep({
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

function WizardStepLabel({ label, helperText, errorText }) {
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

  return <StepLabel {...stepLabelProps}>{label}</StepLabel>;
}

WizardStepperStep.propTypes = {
  completed: PropTypes.bool,
  errorText: PropTypes.node,
  helperText: PropTypes.node,
  index: PropTypes.number,
  label: PropTypes.string.isRequired,
  last: PropTypes.bool
};
