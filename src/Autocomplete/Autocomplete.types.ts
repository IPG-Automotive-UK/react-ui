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
  | "onChange"
  | "options"
  | "value"
  | "defaultValue"
  | "disabled"
  | "size"
  | "limitTags"
  | "disableCloseOnSelect"
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
