import * as React from "react";

import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import {
  VerticalAlignBottom,
  VerticalAlignCenter,
  VerticalAlignTop
} from "@mui/icons-material";

import PropTypes from "prop-types";

/**
 * Vertical alignment button group component to toggle between top/center/bottom alignment
 */
export default function AlignVertical({
  disabled = false,
  onChange = () => {},
  orientation = "horizontal",
  size = "medium",
  value = "top"
}) {
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

AlignVertical.propTypes = {
  /**
   * If `true`, the button group will be disabled.
   */
  disabled: PropTypes.bool,
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
  onChange: PropTypes.func,
  /**
   * The orientation of the toggle button group.
   */
  orientation: PropTypes.oneOf(["horizontal", "vertical"]),
  /**
   * The size of the component.
   */
  size: PropTypes.oneOf(["small", "medium", "large"]),
  /**
   * The value of the selected toggle button.
   */
  value: PropTypes.oneOf(["bottom", "center", "top"])
};
