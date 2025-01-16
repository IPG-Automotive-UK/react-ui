import * as React from "react";

import { Box, Popover, Typography } from "@mui/material";

import LabelChip from "../LabelSelector/LabelChip";
import PropTypes from "prop-types";

/**
 * Handles the rendering of multiple labels. If there is only one label, it will render a single label chip. If there are multiple labels, it will render a popover with all the labels inside when the label is hovered.
 */
export default function MultiLabelPopover({ labels = [] }) {
  // state for popover anchor
  const [anchorEl, setAnchorEl] = React.useState(null);

  // handler for mouse enter
  const handlePopoverOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  // handler for mouse exit
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  // is popover open
  const open = Boolean(anchorEl);

  // if no labels, return null
  if (!labels.length) return null;

  // if only one label, return a label chip
  if (labels.length === 1) {
    const { _id, name, color } = labels[0];
    return (
      <LabelChip
        key={_id}
        label={name}
        color={color}
        size="small"
        variant="filled"
      />
    );
  }

  return (
    <div>
      <Typography
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        color="primary"
        variant="body2"
        sx={{ fontWeight: "500" }}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >{`${labels.length} labels`}</Typography>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none"
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: "left",
          vertical: "bottom"
        }}
        transformOrigin={{
          horizontal: "left",
          vertical: "top"
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 1,
            maxWidth: 250,
            p: 1
          }}
        >
          {labels.map(label => (
            // loop through all labels and return a label for each
            <LabelChip
              key={label._id}
              label={label.name}
              color={label.color}
              size="small"
              variant="filled"
            />
          ))}
        </Box>
      </Popover>
    </div>
  );
}

// prop types
MultiLabelPopover.propTypes = {
  /**
   * The labels to render.
   */
  labels: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      color: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  )
};
