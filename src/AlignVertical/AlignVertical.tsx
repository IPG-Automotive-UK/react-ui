import * as React from "react";

import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import {
  VerticalAlignBottom,
  VerticalAlignCenter,
  VerticalAlignTop
} from "@mui/icons-material";

import { AlignVerticalProps } from "./AlignVertical.types";

/**
 * Vertical alignment button group component to toggle between top/center/bottom alignment
 */
export default function AlignVertical({
  disabled = false,
  onChange,
  orientation = "horizontal",
  size = "medium",
  value = "top"
}: AlignVerticalProps) {
  return (
    <ToggleButtonGroup
      aria-label="vertical alignment"
      disabled={disabled}
      exclusive
      onChange={onChange}
      orientation={orientation}
      size={size}
      value={value}
    >
      <ToggleButton aria-label="top aligned" value="top" data-testid="top">
        <VerticalAlignTop />
      </ToggleButton>
      <ToggleButton
        aria-label="vertically centered"
        value="center"
        data-testid="center"
      >
        <VerticalAlignCenter />
      </ToggleButton>
      <ToggleButton
        aria-label="bottom aligned"
        value="bottom"
        data-testid="bottom"
      >
        <VerticalAlignBottom />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
