import * as React from "react";

import { Button, Typography } from "@mui/material";

import { FilterList } from "@mui/icons-material";
import PropTypes from "prop-types";

/**
 * A button that represents a filter state. It accepts an onClick callback, and renders a label and a filter count.
 */
export default function FilterButton({ onClick, count = 0, label, ...props }) {
  const displayLabel = count > 0 ? `${label} (${count})` : `${label}`;
  const iconColor = count > 0 ? "primary" : "action";
  const textColor = count > 0 ? "primary" : "textSecondary";
  return (
    <Button
      sx={{ width: "fit-content" }}
      disableRipple
      onClick={onClick}
      {...props}
    >
      <FilterList color={iconColor} />
      <Typography
        variant="button"
        fontWeight="medium"
        flexGrow={1}
        ml={2}
        color={textColor}
      >
        {displayLabel}
      </Typography>
    </Button>
  );
}

FilterButton.propTypes = {
  /**
   * The number of filters that are active.
   */
  count: PropTypes.number,
  /**
   * The label for the button.
   */
  label: PropTypes.string,
  /**
   * Callback function to handle clicks
   * @param {Event} event - The event source of the callback
   * @returns {void}
   */
  onClick: PropTypes.func
};
