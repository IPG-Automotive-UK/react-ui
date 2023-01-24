import * as React from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import PropTypes from "prop-types";

export default function BackButton({ onClick }) {
  return (
    <Button onClick={onClick} variant="outlined" size="large">
      <ArrowBackIcon sx={{ mr: 1 }} />
      Back
    </Button>
  );
}

// prop types
BackButton.propTypes = {
  onClick: PropTypes.func
};
