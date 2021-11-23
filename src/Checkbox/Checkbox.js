import * as React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MuiCheckbox from "@mui/material/Checkbox";
import PropTypes from "prop-types";

/**
 * Checkbox component
 */
export default function Checkbox({
  checked = false,
  disabled = false,
  label = "",
  onChange = () => {},
  size = "medium"
}) {
  // return components
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <MuiCheckbox
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            size={size}
          />
        }
        label={label}
      />
    </FormGroup>
  );
}

Checkbox.PropTypes = {
  /*
   * If true, the component is checked.
   */
  checked: PropTypes.bool,
  /**
   * If true, the component is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Text to be used alongside checkbox.
   */
  label: PropTypes.string,
  /**
   * Callback fired when the state is changed.
   *
   * **Signature**
   * ```
   * function(event: object) => void
   * ```
   * _event_: The event source of the callback. You can pull out the new checked state by accessing event.target.checked (boolean).
   */
  onChange: PropTypes.func,
  /**
   * The size of the component.
   */
  size: PropTypes.oneOf(["small", "medium"])
};
