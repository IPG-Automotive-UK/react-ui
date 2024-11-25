import * as React from "react";

import { Button, Stack } from "@mui/material";

import { ClearFilterButtonProps } from "./ClearFilterButton.types";

/**
 * A button that clears all filters when clicked.
 */
export function ClearFilterButton({
  label = "CLEAR ALL FILTERS",
  onClick
}: ClearFilterButtonProps) {
  return (
    <Stack
      sx={{
        alignItems: "center",
        px: 3,
        py: 1.5
      }}
    >
      <Button
        sx={{ width: "fit-content" }}
        onClick={onClick}
        data-testid="filter-clear-button"
      >
        {label}
      </Button>
    </Stack>
  );
}
