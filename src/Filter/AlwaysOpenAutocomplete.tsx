import * as React from "react";

import { Autocomplete, Stack } from "@mui/material";

import type { AlwaysOpenAutocompleteProps } from "./AlwaysOpenAutocomplete.types";

/**
 * An overriden Autocomplete component that is always open
 */
export default function AlwaysOpenAutocomplete(
  props: AlwaysOpenAutocompleteProps
) {
  // NOTE: The stack is required because the Autocomplete component inserts the "PopperComponent" as a sibling.
  return (
    <Stack direction="column">
      <Autocomplete open disableCloseOnSelect {...props} />
    </Stack>
  );
}
