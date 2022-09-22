import { InputAdornment, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

/**
 * Number fields let users enter and edit numbers.
 */
export default function NumberField({
  disabled = false,
  endAdornment = null,
  error = false,
  helperText,
  label,
  margin = "normal",
  max = +Infinity,
  min = -Infinity,
  onChange = () => {},
  placeholder,
  required = false,
  showMinMaxErrorMessage = true,
  size = "medium",
  startAdornment = null,
  step,
  stepper = true,
  value = null,
  variant = "outlined"
}) {
  // state to keep track of the value of the number field even when invalid
  const [currentValue, setCurrentValue] = useState(value);
  useEffect(() => {
    setCurrentValue(value);
  }, [value, min, max]);

  // method to return value validitity and error message
  const isValidValue = value => {
    if (value === undefined) {
      // accept empty string as undefined
      return [true, ""];
    } else if (value < min) {
      // check if value meets min requirement
      return [
        false,
        showMinMaxErrorMessage ? `Must be greater than or equal to ${min}.` : ""
      ];
    } else if (value > max) {
      // check if value meets max requirement
      return [
        false,
        showMinMaxErrorMessage ? `Must be less than or equal to ${max}.` : ""
      ];
    } else if (step !== undefined && value % step !== 0) {
      // check if value meets step requirement
      const options = getNearestSteps(value, step);
      return [
        false,
        `Must be a multiple of ${step}. Try ${options[0]} or ${options[1]}.`
      ];
    } else {
      // otherwise value is valid
      return [true, undefined];
    }
  };

  // check the validity of the current value
  const [isValid, validationText] = isValidValue(currentValue);

  // callback for value changing
  const handleChange = event => {
    // get the new value
    const newValue = string2number(event.target.value);
    const [isValid] = isValidValue(newValue);
    // update the current value
    setCurrentValue(newValue);
    // call the onChange callback if the value is valid
    isValid &&
      onChange({ ...event, target: { ...event.target, value: newValue } });
  };

  return (
    <TextField
      data-testid="NumberField"
      disabled={disabled}
      error={!isValid || error}
      fullWidth
      helperText={validationText || helperText}
      label={label}
      margin={margin}
      onChange={handleChange}
      placeholder={placeholder}
      required={required}
      size={size}
      type="number"
      value={currentValue ?? ""}
      variant={variant}
      InputProps={{
        ...(endAdornment && {
          endAdornment: (
            <InputAdornment position="end">{endAdornment}</InputAdornment>
          )
        }),
        ...(startAdornment && {
          startAdornment: (
            <InputAdornment position="start">{startAdornment}</InputAdornment>
          )
        })
      }}
      inputProps={{
        max,
        min,
        step
      }}
      sx={
        !stepper
          ? {
              "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                { display: "none" }
            }
          : {}
      }
    />
  );
}

/**
 * Converts a string to a number.
 * @param {*} value - The value to convert.
 * @returns {number} - The converted value.
 */
const string2number = value => {
  if (value === "") {
    return undefined;
  } else {
    return Number(value);
  }
};

/**
 * Returns the two nearest steps to a value.
 * @param {*} value - The value to get the nearest steps for.
 * @param {*} step - The step size.
 * @returns {number[]} - The two nearest steps.
 */
const getNearestSteps = (value, step) => {
  const lower = Math.floor(value / step) * step;
  const upper = Math.ceil(value / step) * step;
  return [lower, upper];
};

// prop types
NumberField.propTypes = {
  /**
   * If true, the label, input and helper text should be displayed in a disabled state.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * When set this string will appear as a suffix to the input, this does not effect the value of the output.
   * @default ""
   */
  endAdornment: PropTypes.string,
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
   * Maximum allowable value of the input, if a value is entered that is greater than the max, the value will not be updated.
   * if the stepper is enabled this will be the maximum value of the stepper.
   */
  max: PropTypes.number,
  /**
   * Minimum allowable value of the input, if a value is entered that is less than the min, the value will not be updated.
   * if the stepper is enabled this will be the minimum value of the stepper.
   */
  min: PropTypes.number,
  /**
   * Callback fired when the value is changed.
   *
   * **Signature**
   * ```
   * function(event: object) => void
   * ```
   * _event_: The event source of the callback. You can pull out the new value by accessing `event.target.value` (number).
   */
  onChange: PropTypes.func,
  /**
   * Placeholder text to display when there is no value.
   */
  placeholder: PropTypes.number,
  /**
   * If true, the label will indicate that the input is required.
   * @default false
   */
  required: PropTypes.bool,
  /**
   * If true, the component will display an error message if the value is outside of the allowable min or max values, providing a min or max value is set.
   * @default "true"
   */
  showMinMaxErrorMessage: PropTypes.bool,
  /**
   * The size of the select field.
   * @default "medium"
   */
  size: PropTypes.oneOf(["medium", "small"]),
  /**
   * When set this string will appear as a prefix to the input, this does not effect the value of the output.
   * @default ""
   */
  startAdornment: PropTypes.string,
  /**
   * If the stepper in enabled, this is the step increment
   * @default 1
   */
  step: PropTypes.number,
  /**
   * If true, the numberfield will have stepper arrows
   * @default true
   */
  stepper: PropTypes.bool,
  /**
   * The input value
   */
  value: PropTypes.number || null,
  /**
   * The variant to use.
   * @default "outlined"
   */
  variant: PropTypes.oneOf(["standard", "outlined", "filled"])
};
