import * as React from "react";
import {
  FormControlLabel,
  FormGroup,
  Checkbox as MuiCheckbox
} from "@mui/material";
import PropTypes from "prop-types";

/**
 * Checkbox component
 */
export default function Checkbox({
  checked = false,
  disabled = false,
  label = "",
  onChange = () => {},
  size = "medium",
  style = {}
}) {
  // return components
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <MuiCheckbox
            sx={style}
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

Checkbox.propTypes = {
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
  size: PropTypes.oneOf(["small", "medium"]),
  /*
   * Custom style to apply to the checkbox.
   */
  style: PropTypes.array
};
