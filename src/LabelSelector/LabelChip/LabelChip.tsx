import { Chip, alpha, chipClasses, darken } from "@mui/material";

import { LabelChipProps } from "./LabelChip.types";
import React from "react";

// component to display a chip with custom colors
export default function LabelChip({
  clickable = false,
  label,
  color = "#005FA8",
  size = "medium",
  variant = "filled",
  visible = true,
  ...props
}: LabelChipProps) {
  // return the styled chip component
  return (
    <Chip
      {...props}
      className="label-chip"
      clickable={clickable}
      sx={{
        "&:hover": {
          backgroundColor: clickable ? darken(color, 0.2) : color
        },
        backgroundColor: color,
        color: theme => theme.palette.getContrastText(color),
        [`& .${chipClasses.deleteIcon}`]: {
          color: theme => alpha(theme.palette.getContrastText(color), 0.7)
        },
        [`& .${chipClasses.deleteIcon}:hover`]: {
          color: theme => theme.palette.getContrastText(color)
        },
        visibility: visible ? "visible" : "hidden"
      }}
      label={label}
      size={size}
      variant={variant}
    />
  );
}
