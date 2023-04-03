import * as React from "react";

import { GridView, TableRowsOutlined } from "@mui/icons-material";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import PropTypes from "prop-types";

/**
 * Horizontal alignment button group component to toggle between card/table view
 */
export default function ViewToggleButton({
  disabled = false,
  onChange = () => {},
  orientation = "horizontal",
  size = "medium",
  value = "card"
}) {
  // return components
  return (
    <ToggleButtonGroup
      aria-label="toggle view"
      disabled={disabled}
      exclusive
      onChange={onChange}
      orientation={orientation}
      size={size}
      value={value}
    >
      <ToggleButton
        aria-label="card button"
        data-testid="cardButton"
        value="card"
      >
        <GridView />
      </ToggleButton>
      <ToggleButton
        aria-label="table button"
        data-testid="tableButton"
        value="table"
      >
        <TableRowsOutlined />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

ViewToggleButton.propTypes = {
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
   * The value of the selected button.
   */
  value: PropTypes.oneOf(["card", "table"])
};
