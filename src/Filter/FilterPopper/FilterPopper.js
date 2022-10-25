import * as React from "react";

import { ClickAwayListener, Paper, Popper, Stack } from "@mui/material";

import FilterButton from "./FilterButton";
import PropTypes from "prop-types";

/**
 * A button that represents a filter state. Clicking opens a popper containing children.
 */
export default function FilterPopper({ children, label, count }) {
  // anchor element
  const [anchorEl, setAnchorEl] = React.useState(null);
  const popperOpen = Boolean(anchorEl);

  // callback for button click
  const handleClick = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  // callback for clickaway
  const handleClickAway = () => {
    setAnchorEl(null);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div>
        <FilterButton onClick={handleClick} count={count} label={label} />
        <Popper
          anchorEl={anchorEl}
          open={popperOpen}
          placement="bottom-start"
          sx={{
            width: 350,
            zIndex: 1
          }}
        >
          <Paper
            sx={{
              mt: 1,
              p: 2
            }}
          >
            <Stack gap={2}>{children}</Stack>
          </Paper>
        </Popper>
      </div>
    </ClickAwayListener>
  );
}

// prop types
FilterButton.propTypes = {
  /**
   * The number of filters that are active.
   */
  count: PropTypes.number,
  /**
   * The label for the button.
   */
  label: PropTypes.string
};
