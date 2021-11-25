import { TextField as MuiTextField } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

/**
 * NumberField components are used for collecting user provided information as a Number.
 */
export default function NumberField({
  disabled = false,
  error = false,
  helperText,
  label,
  margin = "normal",
  max,
  min,
  onChange = () => {},
  placeholder,
  required = false,
  size = "medium",
  step = 1,
  stepper = true,
  value,
  variant = "outlined"
}) {
  const [valueError, setValueError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  // handleChange
  const handleChange = event => {
    // update event.target.value so that it is a number
    const newValue = Number(event.target.value);
    const newEventValue = { target: { value: newValue } };
    const updatedEvent = { ...event, ...newEventValue };

    // if the value is less than minimum, set error
    if (newValue < min && min !== undefined) {
      setValueError(true);
      setErrorMessage(`Value must be greater than or equal to ${min}`);
      return;
    }

    // if the value is greater than maximum, set error
    if (newValue > max && max !== undefined) {
      setValueError(true);
      setErrorMessage(`Value must be less than or equal to ${max}`);
      return;
    }

    // set error to false and fire onChange
    setValueError(false);
    setErrorMessage("");
    onChange(updatedEvent);
  };
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
      value={value}
      variant={variant}
      inputProps={{ max: max, min: min, step: step }}
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
   * If true, the component will display an error state.
   * @default false
   */
  error: PropTypes.bool,
  /**
   * Helper text to display below input.
   */
  helperText: PropTypes.string,
  /**
   * Attributes applied to the input element
   */
  inputProps: PropTypes.object,
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
   * The size of the select field.
   * @default "medium"
   */
  size: PropTypes.oneOf(["medium", "small"]),
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
