import MaskedInput from "react-text-mask";
import { TextField as MuiTextField } from "@mui/material";
import React from "react";
import { TextFieldProps } from "./TextField.types";

// masked input
const MaskedTextField = React.forwardRef(function MaskedTextField(props, ref) {
  return (
    <MaskedInput
      {...props}
      mask={[/[1-9]/, /\d/, /\d/, "/", /[1-9]/, /\d/, "R", /[1-9]/, /\d/]}
      keepCharPositions={true}
    />
  );
});

/**
 * TextField components are used for collecting user provided information as a string.
 */
export default function TextField({
  defaultValue,
  disabled = false,
  error = false,
  InputProps = { inputComponent: MaskedTextField },
  helperText,
  label,
  margin = "normal",
  multiline = false,
  minRows = 2,
  maxRows = 4,
  name,
  onBlur = () => {},
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
      defaultValue={defaultValue}
      disabled={disabled}
      error={error}
      fullWidth
      helperText={helperText}
      label={label}
      margin={margin}
      multiline={multiline}
      minRows={multiline ? minRows : undefined}
      maxRows={multiline ? maxRows : undefined}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      size={size}
      type="string"
      value={value}
      variant={variant}
      slotProps={{
        input: !isFieldMasked ? undefined : InputProps
      }}
    />
  );
}
