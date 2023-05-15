import { TextField as MuiTextField } from "@mui/material";
import React from "react";
import { TextFieldProps } from "./TextField.types";

/**
 * TextField components are used for collecting user provided information as a string.
 */
export default function TextField({
  disabled = false,
  error = false,
  InputProps,
  helperText,
  label,
  margin = "normal",
  onChange = () => {},
  placeholder,
  required = false,
  size = "medium",
  value,
  variant = "outlined"
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
      InputProps={InputProps}
      required={required}
      size={size}
      type="string"
      value={value}
      variant={variant}
    />
  );
}
