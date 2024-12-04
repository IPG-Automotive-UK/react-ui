import * as React from "react";

import type { AlwaysOpenAutocompleteProps } from "./AlwaysOpenAutocomplete.types";
import { Stack } from "@mui/material";
import { VirtualizedAutocomplete } from "./CheckboxFilter/VirtualizedAutocomplete";

/**
 * An overriden Autocomplete component that is always open
 */
export default function AlwaysOpenAutocomplete(
  props: AlwaysOpenAutocompleteProps
) {
  // NOTE: The stack is required because the Autocomplete component inserts the "PopperComponent" as a sibling.
  return (
    <Stack direction="column">
      <VirtualizedAutocomplete open disableCloseOnSelect {...props} />
    </Stack>
  );
}
