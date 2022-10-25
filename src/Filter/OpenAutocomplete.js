import * as React from "react";

import { Autocomplete, Paper } from "@mui/material";

/**
 * An overriden Autocomplete component that is always open
 */
export default function OpenAutocomplete(props) {
  return (
    <Autocomplete
      open
      disableCloseOnSelect
      disablePortal
      PopperComponent={({ children }) => children} // no popper required
      PaperComponent={props => (
        <Paper {...props} elevation={0} sx={{ background: "none" }} />
      )}
      {...props}
    />
  );
}
