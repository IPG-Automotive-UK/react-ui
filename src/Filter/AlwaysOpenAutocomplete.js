import * as React from "react";

import { Autocomplete, Box, Stack } from "@mui/material";

/**
 * A replacement for the PopperComponent which is just a div.
 */
function PopperComponent(props) {
  // remove the unwanted props
  // disablePortal, anchorEl and open because we aren't a Popper
  // style because it contains width, but it doesn't recalc often enough and we always want it to be 100%
  const { disablePortal, anchorEl, open, style, ...other } = props;
  return <Box {...other} width="100%" />;
}

/**
 * An overriden Autocomplete component that is always open
 */
export default function AlwaysOpenAutocomplete(props) {
  // NOTE: The stack is required because the Autocomplete component inserts the "PopperComponent" as a sibling.
  return (
    <Stack direction="column">
      <Autocomplete
        open
        disableCloseOnSelect
        PopperComponent={PopperComponent} // no popper required
        PaperComponent={Box} // no paper required
        {...props}
      />
    </Stack>
  );
}
