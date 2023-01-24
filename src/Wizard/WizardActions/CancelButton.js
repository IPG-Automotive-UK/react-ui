import * as React from "react";

import { Button } from "@mui/material";
import PropTypes from "prop-types";

export default function BackButton({ onClick }) {
  return (
    <Button onClick={onClick} size="large">
      Cancel
    </Button>
  );
}

// prop types
BackButton.propTypes = {
  onClick: PropTypes.func
};
