import { TextFieldProps } from "@mui/material";

export type NumberFieldChangeEvent = Omit<
  React.ChangeEvent<HTMLInputElement>,
  "target"
> & {
  target: {
    value: number | null;
  } & EventTarget;
};

/**
 * Give acccess to MUI TextField props and custom props
 * Omit `sx` and `type` from MUI TextField props
 */
export type NumberFieldProps = Omit<
  TextFieldProps,
  | "maxRows"
  | "minRows"
  | "multiline"
  | "onChange"
  | "rows"
  | "select"
  | "sx"
  | "type"
> & {
  endAdornment?: string;
  min?: number;
  max?: number;
  onChange?: (event: NumberFieldChangeEvent) => void;
  showMinMaxErrorMessage?: boolean;
  startAdornment?: string;
  step?: number;
  stepper?: boolean;
  value?: number | null;
};
