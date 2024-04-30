import {
  AutocompleteProps as MuiAutocompleteProps,
  TextFieldProps
} from "@mui/material";

import { KeyValueOption } from "../Common.types";

export type AutocompleteProps<
  Value extends string | KeyValueOption,
  Multiple extends boolean | undefined
> = Pick<
  MuiAutocompleteProps<Value, Multiple, false, false>,
  | "multiple"
  | "onBlur"
  | "onChange"
  | "options"
  | "value"
  | "defaultValue"
  | "disabled"
  | "size"
  | "limitTags"
  | "disableCloseOnSelect"
  | "noOptionsText"
> &
  Pick<
    TextFieldProps,
    | "size"
    | "helperText"
    | "margin"
    | "name"
    | "variant"
    | "required"
    | "label"
    | "error"
  >;
