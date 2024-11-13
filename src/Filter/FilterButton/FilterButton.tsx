import { Button, Typography } from "@mui/material";

import { FilterButtonProps } from "./FilterButton.types";
import { FilterList } from "@mui/icons-material";
import React from "react";

/**
 * A button that represents a filter state. It accepts an onClick callback, and renders a label and a filter count.
 */
export function FilterButton({
  onClick,
  count = 0,
  label = "Filters"
}: FilterButtonProps) {
  // filter button label, with count if available (e.g. "Filters (3)")
  const displayLabel = count > 0 ? `${label} (${count})` : `${label}`;
  // color of the icon and text based on the filter count
  const iconColor = count > 0 ? "primary" : "action";
  const textColor = count > 0 ? "primary" : "textSecondary";
  return (
    <Button
      data-testid="filter-open-button"
      sx={{ width: "fit-content" }}
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
