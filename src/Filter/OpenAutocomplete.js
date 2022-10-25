import * as React from "react";

import { Autocomplete, Stack } from "@mui/material";

/**
 * An overriden Autocomplete component that is always open
 */
export default function OpenAutocomplete(props) {
  // NOTE: The stack is required because the Autocomplete component inserts the "PopperComponent" as a sibling.
  return (
    <Stack direction="column">
      <Autocomplete
        open
        disableCloseOnSelect
        disablePortal
        PopperComponent={({ children }) => children} // no popper required
        PaperComponent={({ children }) => children} // no paper required
        {...props}
      />
    </Stack>
  );
}
