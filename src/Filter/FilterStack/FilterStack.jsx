import * as React from "react";

import { Box } from "@mui/material";
import ClearFilterButton from "./ClearFilterButton";
import PropTypes from "prop-types";

/**
 * Stacks filters horizontally. If the filter count is positive, a "Clear Filters" button is shown. Responsively flows filters to the next line if they don't fit on the current line.
 */
export default function FilterStack({ count, onClear, children }) {
  return (
    <Box
      display="flex"
      flexWrap="wrap"
      flexDirection="row"
      rowGap={1}
      columnGap={2}
    >
      {children}
      {count > 0 && <ClearFilterButton onClick={onClear} />}
    </Box>
  );
}

// prop types
FilterStack.propTypes = {
  /**
   * The number of filters that are active.
   */
  count: PropTypes.number,
  /**
   * The callback for the clear button.
   * @param {object} event The event source of the callback.
   * @returns {void}
   */
  onClear: PropTypes.func
};
