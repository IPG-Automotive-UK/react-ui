import {
  AutocompleteProps as MuiAutocompleteProps,
  TextFieldProps
} from "@mui/material";

import { KeyValueOption } from "../Common.types";

export type AutocompleteProps<
  Value extends string | KeyValueOption,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined
> = Pick<
  MuiAutocompleteProps<Value, Multiple, DisableClearable, false>,
  | "multiple"
  | "onBlur"
  | "onChange"
  | "options"
  | "value"
  | "defaultValue"
  | "disabled"
  | "disableClearable"
  | "inputValue"
  | "size"
  | "limitTags"
  | "disableCloseOnSelect"
  | "noOptionsText"
  | "readOnly"
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
