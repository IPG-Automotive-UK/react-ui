import { InputAdornment, TextField } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";

import { NumberFieldProps } from "./NumberField.types";

/**
 * Number fields let users enter and edit numbers.
 */
export default function NumberField(props: NumberFieldProps) {
  // destructure custom props and create defaults different from the MUI TextField component
  // spread the rest of the mui component props
  const {
    endAdornment,
    error,
    helperText,
    margin = "normal",
    max = +Infinity,
    min = -Infinity,
    onChange,
    showMinMaxErrorMessage = true,
    startAdornment,
    step,
    stepper = true,
    value,
    variant = "outlined",
    ...rest
  } = props;

  // state to keep track of the value of the number field even when invalid
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    setCurrentValue(value);
  }, [value, min, max]);

  // method to return value validitity and error message
  const isValidValue = (value?: number | null) => {
    if (value === null || value === undefined) {
      // accept empty string as null
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
    } else if (step !== undefined && !isStep(value, step)) {
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
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // get the new value
    const newValue = string2number(event.target.value);
    const [isValid] = isValidValue(newValue);

    // update the current value
    setCurrentValue(newValue);

    // call the onChange callback if the value is valid
    if (onChange && isValid) {
      isValid && onChange(newValue);
    }
  };

  // return a MUI TextField component
  // explicitly declare custom props and defaults
  // spread the rest of the mui component props
  return (
    <TextField
      error={!isValid || error}
      fullWidth
      {...rest}
      helperText={validationText || helperText}
      margin={margin}
      variant={variant}
      InputLabelProps={{ shrink: true }}
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
      onChange={handleChange}
      sx={
        !stepper
          ? {
              "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                { display: "none" }
            }
          : {
              "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                { opacity: 1 }
            }
      }
      type="number"
      value={currentValue}
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
    return null;
  } else {
    return Number(value);
  }
};

/**
 * Returns the precision of a number.
 * @param {number} value - The value to get the precision of.
 * @returns {number} - The precision of the value.
 */
const precision = value => {
  if (Math.floor(value) === value) return 0;
  return value.toString().split(".")[1].length || 0;
};

/**
 * Returns the two nearest steps to a value.
 * @param {number} value - The value to get the nearest steps for.
 * @param {number} step - The step size.
 * @returns {number[]} - The two nearest steps.
 */
const getNearestSteps = (value, step) => {
  // handle floating point math with a conversion to integer math
  const precisionValue = precision(step);
  const m = Math.pow(10, precisionValue);
  const lower = Math.floor(value / step) * step * m;
  const upper = lower + step * m;
  return [lower, upper].map(v => v / m);
};

/**
 * Returns whether a value is a step.
 * @param {number} value - The value to check.
 * @param {number} step - The step size.
 * @returns {boolean} - Whether the value is a step.
 */
const isStep = (value, step) => {
  // handle floating point math with a conversion to integer math
  const precisionValue = precision(step);
  const m = Math.pow(10, precisionValue);
  return ((value * m) % (step * m)) / m === 0;
};
