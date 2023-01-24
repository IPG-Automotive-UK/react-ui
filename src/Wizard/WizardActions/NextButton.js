import * as React from "react";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Button } from "@mui/material";
import PropTypes from "prop-types";

export default function BackButton({ onClick }) {
  return (
    <Button onClick={onClick} variant="contained" color="primary" size="large">
      Next
      <ArrowForwardIcon sx={{ ml: 1.5 }} />
    </Button>
  );
}

// prop types
BackButton.propTypes = {
  onClick: PropTypes.func
};
