import { Chip } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { colord } from "colord";

// component to display a chip with custom colors
export default function LabelChip({ color, variant, ...props }) {
  // create a styled chip component

  const StyledChip = props => (
    <Chip
      sx={{
        "&:active": {
          backgroundColor: color,
          borderColor: color,
          boxShadow: "none"
        },
        "&:hover": {
          backgroundColor: color,
          filter: "brightness(120%)"
        },
        backgroundColor: `${color} !important`,
        color: colord(color).isDark()
          ? colord(color).lighten(0.5).toHex()
          : colord(color).darken(0.5).toHex(),
        deleteIcon: {
          color: colord(color).isDark()
            ? colord(color).lighten(0.2).toHex()
            : colord(color).darken(0.1).toHex()
        },
        icon: {
          color: colord(color).isDark()
            ? colord(color).lighten(0.2).toHex()
            : colord(color).darken(0.2).toHex()
        },
        outlined: {
          backgroundColor: `transparent !important`,
          border: `1px solid ${color}`,
          color
        }
      }}
      {...props}
    />
  );

  // return the styled chip component
  return (
    <StyledChip
      {...props}
      variant={variant}
      onClick={props.onClick}
      clickable={props.clickable}
    />
  );
}

// set default props
LabelChip.defaultProps = {
  clickable: false,
  color: "#005FA8",
  onClick: () => {},
  variant: "default"
};

// set prop types
LabelChip.propTypes = {
  clickable: PropTypes.bool,
  color: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.string
};
