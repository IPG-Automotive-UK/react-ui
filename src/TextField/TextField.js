import { TextField as MuiTextField } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

/**
 * TextField components are used for collecting user provided information as a string.
 */
export default function TextField({
  disabled = false,
  error = false,
  helperText,
  label,
  margin = "normal",
  onChange = () => {},
  placeholder,
  required = false,
  size = "medium",
  value,
  variant = "outlined"
}) {
  // return components
  return (
    <MuiTextField
      disabled={disabled}
      error={error}
      fullWidth
      helperText={helperText}
      label={label}
      margin={margin}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      size={size}
      type="string"
      value={value}
      variant={variant}
    />
  );
}

TextField.propTypes = {
  /**
   * If true, the label, input and helper text should be displayed in a disabled state.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If true, the component will display an error state.
   * @default false
   */
  error: PropTypes.bool,
  /**
   * Helper text to display below input.
   */
  helperText: PropTypes.string,
  /**
   * Label to display above input.
   */
  label: PropTypes.string,
  /**
   * If dense or normal, will adjust vertical spacing of this and contained components.
   * @default "normal"
   */
  margin: PropTypes.oneOf(["none", "dense", "normal"]),
  /**
   * Callback fired when the value is changed.
   *
   * **Signature**
   * ```
   * function(event: object) => void
   * ```
   * _event_: The event source of the callback. You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: PropTypes.func,
  /**
   * Placeholder text to display when there is no value.
   */
  placeholder: PropTypes.string,
  /**
   * If true, the label will indicate that the input is required.
   * @default false
   */
  required: PropTypes.bool,
  /**
   * The size of the select field.
   * @default "medium"
   */
  size: PropTypes.oneOf(["medium", "small"]),
  /**
   * The input value
   */
  value: PropTypes.string,
  /**
   * The variant to use.
   * @default "outlined"
   */
  variant: PropTypes.oneOf(["standard", "outlined", "filled"])
};
