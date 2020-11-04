import React from "react";
import {
  InputLabel,
  MenuItem,
  FormControl,
  FormHelperText,
  Select as MuiSelect
} from "@material-ui/core";
import PropTypes from "prop-types";

/**
 * Select components are used for collecting user provided information from a list of options.
 */
export default function Select({
  disabled = false,
  helperText,
  label,
  labelWidth,
  margin = "normal",
  onChange = () => {},
  options = [],
  required = false,
  value,
  variant = "standard"
}) {
  // return components
  return (
    <FormControl
      required={required}
      variant={variant}
      error={required && !value}
      margin={margin}
      fullWidth
    >
      {label && <InputLabel id="label">{label}</InputLabel>}
      <MuiSelect
        id={label}
        labelWidth={labelWidth}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        {options.map(option => (
          <MenuItem value={option} key={option}>
            {option}
          </MenuItem>
        ))}
      </MuiSelect>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}

Select.propTypes = {
  /**
   *
   */
  disableMargin: PropTypes.bool,
  /**
   * If true, the label, input and helper text should be displayed in a disabled state.
   */
  disabled: PropTypes.bool,
  /**
   * Helper text to display below input.
   */
  helperText: PropTypes.string,
  /**
   * Array of options to display.
   */
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  /**
   * Label to display above input.
   */
  label: PropTypes.string,
  /**
   * The width of the label.
   */
  labelWidth: PropTypes.number,
  /**
   * If dense or normal, will adjust vertical spacing of this and contained components.
   */
  margin: PropTypes.oneOf(["none", "dense", "normal"]),
  /**
   * Callback function fired when a menu item is selected.
   */
  onChange: PropTypes.func,
  /**
   * If true, the label will indicate that the input is required.
   */
  required: PropTypes.bool,
  /**
   * The input value
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(["standard", "outlined", "filled"])
};
