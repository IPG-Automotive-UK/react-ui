import * as React from "react";
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined
} from "@mui/icons-material";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import PropTypes from "prop-types";

/**
 * Font style button group component to toggle between bold, italic and underline
 */
export default function FontStyle({
  disabled = false,
  onChange = () => {},
  orientation = "horizontal",
  size = "medium",
  value = []
}) {
  // return components
  return (
    <ToggleButtonGroup
      aria-label="font style"
      disabled={disabled}
      onChange={onChange}
      orientation={orientation}
      size={size}
      value={value}
    >
      <ToggleButton aria-label="bold" data-testid="boldButton" value="bold">
        <FormatBold />
      </ToggleButton>
      <ToggleButton
        aria-label="italic"
        data-testid="italicButton"
        value="italic"
      >
        <FormatItalic />
      </ToggleButton>
      <ToggleButton
        aria-label="underline"
        data-testid="underlineButton"
        value="underline"
      >
        <FormatUnderlined />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

FontStyle.propTypes = {
  /**
   * If true, the component is disabled.
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
   * value: The value of the selected buttons.
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
   * The value of the selected button.
   */
  value: PropTypes.arrayOf(PropTypes.string)
};
