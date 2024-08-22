import * as React from "react";

import { Autocomplete, AutocompleteProps, Stack } from "@mui/material";

/**
 * An overriden Autocomplete component that is always open
 */
export default function AlwaysOpenAutocomplete(
  props: AutocompleteProps<string, boolean, boolean, boolean>
) {
  // NOTE: The stack is required because the Autocomplete component inserts the "PopperComponent" as a sibling.
  return (
    <Stack direction="column">
      <Autocomplete open disableCloseOnSelect {...props} />
    </Stack>
  );
}
