import { Button, Typography, alpha } from "@mui/material";

import { FilterList } from "@mui/icons-material";
import React from "react";
import { SetFilterButtonProps } from "./SetFilterButton.types";

/**
 * A button that represents a filter state. It accepts an onClick callback, and renders a label and a filter count.
 */
export function SetFilterButton({
  onClick,
  count = 0,
  label = "Filters"
}: SetFilterButtonProps) {
  // filter button label, with count if available (e.g. "Filters (3)")
  const displayLabel = count > 0 ? `${label} (${count})` : `${label}`;
  // color of the icon and text based on the filter count
  const iconColor = count > 0 ? "primary" : "action";
  const textColor = count > 0 ? "primary" : "textSecondary";
  return (
    <Button
      data-testid="filter-open-button"
      sx={theme => ({
        "&:focus-visible": {
          border: `1px solid ${alpha(theme.palette.text.primary, 0.23)}`
        },
        width: "fit-content"
      })}
      disableRipple
      onClick={onClick}
    >
      <FilterList color={iconColor} />
      <Typography
        variant="button"
        flexGrow={1}
        ml={1}
        color={textColor}
        data-testid="filter-open-text"
      >
        {displayLabel}
      </Typography>
    </Button>
  );
}
