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
  checked,
  defaultChecked,
  disabled = false,
  label = "",
  name,
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
            sx={{ ...style, pointerEvents: "auto" }}
            checked={checked}
            defaultChecked={defaultChecked}
            disabled={disabled}
            name={name}
            onChange={onChange}
            size={size}
          />
        }
        label={label}
        sx={{ pointerEvents: "none" }}
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
   * The default value of the input.
   */
  defaultChecked: PropTypes.bool,
  /**
   * If true, the component is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Text to be used alongside checkbox.
   */
  label: PropTypes.string,
  /**
   * The name of the input.
   */
  name: PropTypes.string,
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
  style: PropTypes.object
};
