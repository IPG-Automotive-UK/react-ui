import { TextFieldProps } from "@mui/material";

/**
 * Give acccess to MUI TextField props and custom props
 * Omit `sx` and `type` from MUI TextField props
 */
export type NumberFieldProps = Omit<TextFieldProps, "sx" | "type"> & {
  endAdornment?: string;
  startAdornment?: string;
  stepper?: boolean;
};
