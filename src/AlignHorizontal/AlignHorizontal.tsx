import * as React from "react";

import {
  FormatAlignCenter,
  FormatAlignJustify,
  FormatAlignLeft,
  FormatAlignRight
} from "@mui/icons-material";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

export interface AlignHorizontalProps {
  /**
   * If true, the component is disabled.
   */
  disabled?: boolean;
  /**
   * Callback fired when the value changes.
   *
   * **Signature**
   * ```
   * function(event: React.MouseEvent<HTMLElement>, value: any) => void
   * ```
   * event: The event source of the callback.
   * value: The value of the selected button.
   */
  onChange: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    value: "left" | "center" | "right" | "justify" | null
  ) => void;
  /**
   * The orientation of the toggle button group.
   */
  orientation?: "horizontal" | "vertical";
  /**
   * The size of the component.
   */
  size?: "small" | "medium" | "large";
  /**
   * The value of the selected button.
   */
  value?: "left" | "center" | "right" | "justify" | null;
}

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
