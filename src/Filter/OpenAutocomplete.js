import * as React from "react";

import { Autocomplete, Box, Paper, autocompleteClasses } from "@mui/material";

// overriden popper to prevent it sitting above other components
function PopperComponent(props) {
  const { disablePortal, anchorEl, open, ...other } = props;
  return (
    <Box
      {...other}
      sx={{
        [`&.${autocompleteClasses.popperDisablePortal}`]: {
          position: "relative"
        }
      }}
    />
  );
}

/**
 * An overriden Autocomplete component that is always open
 */
export default function OpenAutocomplete(props) {
  return (
    <Autocomplete
      open
      disableCloseOnSelect
      disablePortal
      PopperComponent={PopperComponent}
      PaperComponent={props => <Paper {...props} elevation={0} />}
      {...props}
    />
  );
}
