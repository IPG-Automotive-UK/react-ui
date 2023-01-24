import * as React from "react";

import PropTypes from "prop-types";
import { Typography } from "@mui/material";

/**
 * The Wizard component allows you to create a multi-step form.
 * It handles title and layout.
 */
export default function Wizard({ title, children }) {
  return (
    <div>
      {title ? (
        <Typography variant="h5" fontWeight={500} color="textPrimary">
          {title}
        </Typography>
      ) : null}
      {children}
    </div>
  );
}

// prop types
Wizard.propTypes = {
  /**
   * Wizard title
   */
  title: PropTypes.string
};
