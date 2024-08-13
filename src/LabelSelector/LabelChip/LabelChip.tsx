import { Chip, Tooltip, alpha, chipClasses, darken } from "@mui/material";

import DoneIcon from "@mui/icons-material/Done";
import { LabelChipProps } from "./LabelChip.types";
import NoWrapTypography from "../../NoWrapTypography";
import React from "react";

// component to display a chip with custom colors
export default function LabelChip({
  clickable = false,
  label,
  color = "#005FA8",
  size = "medium",
  variant = "filled",
  visible = true,
  selected = false,
  description = "",
  ...props
}: LabelChipProps) {
  // return the styled chip component
  return (
    <Tooltip title={description} placement="bottom-start">
      <Chip
        {...props}
        className="label-chip"
        clickable={clickable}
        icon={selected ? <DoneIcon color="inherit" /> : undefined}
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
        label={<NoWrapTypography variant="inherit">{label}</NoWrapTypography>}
        size={size}
        variant={variant}
      />
    </Tooltip>
  );
}
