import { TextFieldProps } from "@mui/material";

type NumberFieldChangeEvent = Omit<
  React.ChangeEvent<HTMLInputElement>,
  "target"
> & {
  target: {
    value: number | null;
  } & EventTarget;
};

/**
 * Give acccess to MUI TextField props and custom props
 * Omit `multiline`, `rows`, `select` and `type` from MUI TextField props
 */
export type NumberFieldProps = Omit<
  TextFieldProps,
  "multiline" | "onChange" | "rows" | "select" | "sx" | "type"
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
