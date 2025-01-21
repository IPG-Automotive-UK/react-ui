import {
  FormControl,
  FormGroup,
  FormHelperText,
  FormLabel,
  Stack,
  Switch,
  Typography
} from "@mui/material";

import PropTypes from "prop-types";
import React from "react";

/**
 * Switch form component with layout to match IPG style. Must include two text options which are displayed either side of the switch.
 */
export default function FormSwitch({
  checked,
  defaultChecked,
  disabled = false,
  helperText,
  label,
  name,
  onChange,
  options,
  size = "medium"
}) {
  // return components
  return (
    <FormControl disabled={disabled}>
      {label && (
        <FormLabel
          sx={{
            fontSize: "0.75rem"
          }}
          color="textSecondary"
        >
          {label}
        </FormLabel>
      )}
      <FormGroup>
        <Typography
          component="div"
          color={disabled ? "textSecondary" : "textPrimary"}
        >
          <Stack alignItems="center" component="label" direction="row">
            <SwitchOptionLabel disabled={disabled} label={options[0]} />
            <Switch
              checked={checked}
              defaultChecked={defaultChecked}
              name={name}
              onChange={onChange}
              size={size}
            />
            <SwitchOptionLabel disabled={disabled} label={options[1]} />
          </Stack>
        </Typography>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormGroup>
    </FormControl>
  );
}

/**
 * Returns a label for displaying on either side of the switch
 */
function SwitchOptionLabel({ disabled, label }) {
  return (
    <Typography color={disabled ? "textSecondary" : "textPrimary"}>
      {label}
    </Typography>
  );
}

// prop types
FormSwitch.propTypes = {
  /**
   * If true, the component is checked.
   */
  checked: PropTypes.bool,
  /**
   * The default value of the input.
   */
  defaultChecked: PropTypes.bool,
  /**
   * If true, the switch will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * The helper text content.
   */
  helperText: PropTypes.string,
  /**
   * The label content.
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
   * function(event) => void
   * ```
   *
   * _event_: The event source of the callback. You can pull out the new checked state by accessing event.target.checked (boolean).
   */
  onChange: PropTypes.func,
  /**
   * Options to display either side of the switch. Must be an array of length 2, with type string.
   */
  options: function (props, propName, componentName) {
    if (
      !Array.isArray(props[propName]) ||
      props[propName].length !== 2 ||
      !props[propName].every(s => typeof s === "string")
    ) {
      return new Error(
        `Invalid prop ${propName} supplied to ${componentName}. Expected a string array of length 2.`
      );
    }
  },
  /**
   * The size of switch.
   */
  size: PropTypes.oneOf(["small", "medium"])
};
