import * as React from "react";

import { Button } from "@mui/material";
import { ClearFilterButtonProps } from "./ClearFilterButton.types";

/**
 * A button that clears all filters when clicked.
 */
export function ClearFilterButton({
  label = "CLEAR ALL FILTERS",
  onClick
}: ClearFilterButtonProps) {
  return (
    <Button
      sx={{ width: "fit-content" }}
      onClick={onClick}
      data-testid="filter-clear-button"
    >
      {label}
    </Button>
  );
}
