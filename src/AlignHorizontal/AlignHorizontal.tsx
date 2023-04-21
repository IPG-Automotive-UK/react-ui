import * as React from "react";

import {
  FormatAlignCenter,
  FormatAlignJustify,
  FormatAlignLeft,
  FormatAlignRight
} from "@mui/icons-material";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import { AlignHorizontalProps } from "./AlignHorizontal.types";

/**
 * Horizontal alignment button group component to toggle between left/center/right/justify alignment
 */
export default function AlignHorizontal({
  disabled = false,
  onChange,
  orientation = "horizontal",
  size = "medium",
  value = "left"
}: AlignHorizontalProps) {
  // return components
  return (
    <ToggleButtonGroup
      aria-label="text alignment"
      disabled={disabled}
      exclusive
      onChange={onChange}
      orientation={orientation}
      size={size}
      value={value}
    >
      <ToggleButton
        aria-label="left aligned"
        data-testid="leftButton"
        value="left"
      >
        <FormatAlignLeft />
      </ToggleButton>
      <ToggleButton
        aria-label="centered"
        data-testid="centerButton"
        value="center"
      >
        <FormatAlignCenter />
      </ToggleButton>
      <ToggleButton
        aria-label="right aligned"
        data-testid="rightButton"
        value="right"
      >
        <FormatAlignRight />
      </ToggleButton>
      <ToggleButton
        aria-label="justified"
        data-testid="justifyButton"
        value="justify"
      >
        <FormatAlignJustify />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
