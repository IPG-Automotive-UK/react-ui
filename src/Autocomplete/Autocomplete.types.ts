import {
  AutocompleteProps as MuiAutocompleteProps,
  TextFieldProps
} from "@mui/material";

export type AutocompleteProps<
  Value extends string,
  Multiple extends boolean | undefined
> = Pick<
  MuiAutocompleteProps<Value, Multiple, false, false>,
  | "multiple"
  | "onChange"
  | "options"
  | "value"
  | "disabled"
  | "size"
  | "limitTags"
> &
  Pick<
    TextFieldProps,
    | "size"
    | "helperText"
    | "margin"
    | "variant"
    | "required"
    | "label"
    | "error"
  >;
