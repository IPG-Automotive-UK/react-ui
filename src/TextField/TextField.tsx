import MaskedInput from "react-text-mask";
import { TextField as MuiTextField } from "@mui/material";
import React from "react";
import { TextFieldProps } from "./TextField.types";

// masked input
const TextFieldMask = React.forwardRef((props, ref) => (
  <MaskedInput
    {...props}
    mask={[/[1-9]/, /\d/, /\d/, "/", /[1-9]/, /\d/, "R", /[1-9]/, /\d/]}
    keepCharPositions={true}
  />
));
TextFieldMask.displayName = "TextFieldMask";

/**
 * TextField components are used for collecting user provided information as a string.
 */
export default function TextField({
  disabled = false,
  error = false,
  InputProps = { inputComponent: TextFieldMask },
  helperText,
  label,
  margin = "normal",
  onChange = () => {},
  placeholder,
  required = false,
  size = "medium",
  value,
  variant = "outlined",
  maskTextField = false // add the new prop
}: TextFieldProps) {
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
      InputProps={!maskTextField ? undefined : InputProps} // set InputProps based on the maskTextField prop
      required={required}
      size={size}
      type="string"
      value={value}
      variant={variant}
    />
  );
}
