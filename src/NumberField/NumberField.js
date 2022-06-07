import { InputAdornment, TextField as MuiTextField } from "@mui/material";
import React, { useEffect } from "react";
import PropTypes from "prop-types";

/**
 * NumberField components are used for collecting user provided information as a Number.
 */
export default function NumberField({
  disabled = false,
  endAdornment = null,
  error = false,
  helperText,
  label,
  margin = "normal",
  max,
  min,
  onChange = () => {},
  placeholder,
  required = false,
  showMinMaxErrorMessage = true,
  size = "medium",
  startAdornment = null,
  step = 1,
  stepper = true,
  value,
  variant = "outlined"
}) {
  const [valueError, setValueError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [number, setNumber] = React.useState(value);

  // update the value of the number field
  useEffect(() => {
    setNumber(value);
  }, [value]);

  // helper function to round the number to the nearest step
  const roundAccuratley = (number, decimalPlaces) => {
    return Number(
      Math.floor(number + "e" + decimalPlaces) + "e-" + decimalPlaces
    );
  };

  // helper function to get the number of decimal places
  const countDecimal = number => {
    return number % 1 ? number.toString().split(".")[1].length : 0;
  };

  // validate the number field when, number, min or max changes
  useEffect(() => {
    if (min !== undefined && number < min) {
      setValueError(true);
      if (showMinMaxErrorMessage) {
        setErrorMessage(`Must be greater than or equal to ${min}.`);
      }
    } else if (max !== undefined && number > max) {
      setValueError(true);
      if (showMinMaxErrorMessage) {
        setErrorMessage(`Must be less than or equal to ${max}.`);
      }
    } else if (
      number !== undefined &&
      ((number * 100) % (step * 100)) / 100 !== 0
    ) {
      setValueError(true);

      // get the number of decimal places
      const decimalPlaces = countDecimal(step);
      let lowerLimit = [];
      let upperLimit = [];
      if (step > 1) {
        lowerLimit = Math.floor(number / step) * step;
        upperLimit = lowerLimit + step;
      } else {
        lowerLimit = roundAccuratley(+number, decimalPlaces);
        upperLimit = roundAccuratley(+number + step, decimalPlaces);
      }
      setErrorMessage(
        `Please enter a valid value. The nearest valid values are ${lowerLimit} and ${upperLimit}.`
      );
    } else {
      setValueError(false);
      setErrorMessage("");
    }
  }, [max, min, number]);

  // handleChange
  const handleChange = event => {
    // update event.target.value so that it is a number
    const newValue = Number(event.target.value);
    const newEventValue = { target: { value: newValue } };
    const updatedEvent = { ...event, ...newEventValue };

    // set the number
    setNumber(event.target.value);

    // is min satisfied
    let minSatisfied = true;
    if (min !== undefined && newValue < min) {
      minSatisfied = false;
    }

    // is max satisfied
    let maxSatisfied = true;
    if (max !== undefined && newValue > max) {
      maxSatisfied = false;
    }

    // check if value is multiple of step
    let stepSatisfied = true;
    if (
      newValue !== undefined &&
      ((newValue * 100) % (step * 100)) / 100 !== 0
    ) {
      stepSatisfied = false;
    }

    // if the value is valid, set error to false
    if (
      minSatisfied &&
      maxSatisfied &&
      stepSatisfied &&
      event.target.value !== ""
    ) {
      setValueError(false);
      setErrorMessage("");
      onChange(updatedEvent);
    }
  };

  // end adornment input property
  const endAdornmentInputProperty = endAdornment
    ? {
        endAdornment: (
          <InputAdornment position="end">{endAdornment}</InputAdornment>
        )
      }
    : null;

  // start adornment input property
  const startAdornmentInputProperty = startAdornment
    ? {
        startAdornment: (
          <InputAdornment position="start">{startAdornment}</InputAdornment>
        )
      }
    : null;

  // return components
  return (
    <MuiTextField
      data-testid="NumberField"
      disabled={disabled}
      error={error || valueError}
      fullWidth
      helperText={helperText || errorMessage}
      label={label}
      margin={margin}
      onChange={handleChange}
      placeholder={placeholder}
      required={required}
      size={size}
      type="Number"
      value={number || ""}
      variant={variant}
      InputProps={{
        ...endAdornmentInputProperty,
        ...startAdornmentInputProperty
      }}
      inputProps={{
        max: max,
        min: min,
        step: step
      }}
      sx={
        !stepper
          ? {
              "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                {
                  display: "none"
                }
            }
          : { undefined }
      }
    />
  );
}

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
  value: PropTypes.number,
  /**
   * The variant to use.
   * @default "outlined"
   */
  variant: PropTypes.oneOf(["standard", "outlined", "filled"])
};
