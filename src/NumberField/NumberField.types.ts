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
 * Omit `multiline`, `rows`, `select` and `type` from MUI TextField props
 */
export type NumberFieldProps = Omit<
  TextFieldProps,
  "multiline" | "onChange" | "rows" | "select" | "sx" | "type"
> & {
  /**
   * The end adornment for the input.
   */
  endAdornment?: string;
  /**
   * The min validation value for the input.
   */
  min?: number;
  /**
   * The max validation value for the input.
   */
  max?: number;
  /**
   * Callback fired when the value changes, returns event object with number value.
   */
  onChange?: (event: NumberFieldChangeEvent) => void;
  /**
   * Shows a min/max error message when the value is out of range.
   */
  showMinMaxErrorMessage?: boolean;
  /**
   * The start adornment for the input.
   */
  startAdornment?: string;
  /**
   * The step increment of the input.
   */
  step?: number;
  /**
   * Show/hide the input stepper buttons.
   */
  stepper?: boolean;
  /**
   * The numeric value of the input.
   */
  value?: number | null;
};
