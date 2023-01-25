import * as React from "react";

import PropTypes from "prop-types";
import { Stepper } from "@mui/material";

export default function WizardStepper({ children, activeStep }) {
  return (
    <Stepper
      activeStep={activeStep}
      sx={{
        boxSizing: "border-box",
        maxWidth: 945,
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

WizardStepper.propTypes = {
  activeStep: PropTypes.number.isRequired
};
