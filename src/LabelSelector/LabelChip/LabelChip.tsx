import {
  Chip,
  Tooltip,
  Typography,
  alpha,
  chipClasses,
  darken
} from "@mui/material";

import DoneIcon from "@mui/icons-material/Done";
import { LabelChipProps } from "./LabelChip.types";
import React from "react";
import TruncatedTooltip from "../../TruncatedTooltip/TruncatedTooltip";

// component to display a chip with custom colors
export default function LabelChip({
  clickable = false,
  color = "#005FA8",
  description = "",
  label,
  onClick,
  selected = false,
  size = "medium",
  variant = "filled",
  visible = true,
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
        label={
          <TruncatedTooltip component={Typography} variant="inherit">
            {label}
          </TruncatedTooltip>
        }
        onClick={clickable ? onClick : undefined}
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
        size={size}
        variant={variant}
      />
    </Tooltip>
  );
}
