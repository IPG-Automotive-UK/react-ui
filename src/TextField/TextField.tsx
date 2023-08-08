import MaskedInput from "react-text-mask";
import { TextField as MuiTextField } from "@mui/material";
import React from "react";
import { TextFieldProps } from "./TextField.types";

// masked input
const MaskedTextField = React.forwardRef((props, ref) => (
  <MaskedInput
    {...props}
    mask={[/[1-9]/, /\d/, /\d/, "/", /[1-9]/, /\d/, "R", /[1-9]/, /\d/]}
    keepCharPositions={true}
  />
));
MaskedTextField.displayName = "MaskedTextField";

/**
 * TextField components are used for collecting user provided information as a string.
 */
export default function TextField({
  disabled = false,
  error = false,
  InputProps = { inputComponent: MaskedTextField },
  helperText,
  label,
  margin = "normal",
  multiline = false,
  minRows = "2",
  maxRows = "4",
  onChange = () => {},
  placeholder,
  required = false,
  size = "medium",
  value,
  variant = "outlined",
  isFieldMasked = false
}: TextFieldProps) {
  // return components
  return (
    <MuiTextField
      data-testid="text-field"
      disabled={disabled}
      error={error}
      fullWidth
      helperText={helperText}
      label={label}
      margin={margin}
      multiline={multiline}
      onChange={onChange}
      placeholder={placeholder}
      InputProps={!isFieldMasked ? undefined : InputProps}
      required={required}
      minRows={minRows}
      maxRows={maxRows}
      size={size}
      type="string"
      value={value}
      variant={variant}
    />
  );
}
