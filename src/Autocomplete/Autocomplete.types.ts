import {
  AutocompleteRenderInputParams,
  AutocompleteProps as MuiAutocompleteProps,
  TextFieldProps
} from "@mui/material";

import { KeyValueOption } from "../Common.types";
import React from "react";

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
  | "getOptionLabel"
  | "renderTags"
  | "renderOption"
  | "open"
  | "isOptionEqualToValue"
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
  > & {
    renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode; // Optional
  };

// Type definition for the custom Listbox component props
export type ListboxComponentProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
};
