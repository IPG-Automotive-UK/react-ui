import { Chip, darken } from "@mui/material";

import PropTypes from "prop-types";
import React from "react";

// component to display a chip with custom colors
export default function LabelChip({
  clickable = false,
  label = "Label",
  color = "#005FA8",
  onClick,
  onDelete,
  size = "medium",
  variant = "filled",
  ...props
}) {
  // return the styled chip component
  return (
    <Chip
      {...props}
      clickable={clickable}
      sx={{
        "&:hover": {
          backgroundColor: darken(color, 0.2)
        },
        backgroundColor: color,
        color: theme => theme.palette.getContrastText(color)
      }}
      label={label}
      onClick={onClick}
      onDelete={onDelete}
      size={size}
      variant={variant}
    />
  );
}

// set prop types
LabelChip.propTypes = {
  /**
   * If true, the chip will appear clickable, and will raise when pressed, even if
   * the onClick prop is not defined. If false, the chip will not be clickable,
   * even if onClick prop is defined.
   *
   * @default false
   * @type {boolean}
   *
   */
  clickable: PropTypes.bool,
  /**
   * The color of the component. This component interally overrides the primary
   * color of the theme.
   *
   * @default "#005FA8"
   * @type {string}
   *
   */
  color: PropTypes.string,
  /**
   * The label content of the chip.
   *
   * @default "Label"
   * @type {string}
   * @required
   *
   */
  label: PropTypes.string,
  /**
   * The function to call when the chip is clicked.
   *
   * **Signature:**
   * ```
   * function(event: object) => void
   * ```
   *
   * - `event`: The event source of the callback.
   *
   * @type {function}
   *
   */
  onClick: PropTypes.func,
  /**
   * The function to call when the delete icon is clicked.
   *
   * **Signature:**
   * ```
   * function(event: object) => void
   * ```
   *
   * - `event`: The event source of the callback.
   *
   * @type {function}
   *
   */
  onDelete: PropTypes.func,
  /**
   * The size of the chip.
   * @default "medium"
   * @type {string}
   *
   */
  size: PropTypes.oneOf(["small", "medium"]),
  /**
   * The variant to use.
   *
   * @default "filled"
   * @type {string}
   *
   */
  variant: PropTypes.oneOf(["filled", "outlined"])
};
