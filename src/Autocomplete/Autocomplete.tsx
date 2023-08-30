import * as React from "react";

import {
  Box,
  Checkbox,
  Autocomplete as MuiAutocomplete,
  TextField,
  Typography
} from "@mui/material";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";

import { AutocompleteProps } from "./Autocomplete.types";

export default function Autocomplete<
  Value extends string,
  Multiple extends boolean | undefined
>({
  disableCloseOnSelect = false,
  disabled = false,
  error = false,
  helperText,
  label,
  limitTags = -1,
  margin = "normal",
  multiple = false,
  onChange,
  options,
  required = false,
  size = "medium",
  value,
  variant = "outlined"
}: AutocompleteProps<Value, Multiple>) {
  return (
    <MuiAutocomplete
      disableCloseOnSelect={disableCloseOnSelect}
      limitTags={limitTags}
      multiple={multiple}
      onChange={onChange}
      options={options}
      renderInput={params => (
        <TextField
          {...params}
          label={label}
          error={error}
          helperText={helperText}
          margin={margin}
          required={required}
          variant={variant}
        />
      )}
      renderOption={multiple ? Option : undefined}
      value={value}
      clearIcon={multiple ? null : undefined}
      disabled={disabled}
      size={size}
    />
  );
}

// renderer for a checkbox option
function Option(
  props: React.HTMLAttributes<HTMLLIElement>,
  option: string,
  { selected }: { selected: boolean }
) {
  return (
    <Box component="li" {...props}>
      <Checkbox
        icon={<CheckBoxOutlineBlank fontSize="small" />}
        checkedIcon={<CheckBox fontSize="small" />}
        checked={selected}
        value={option}
      />
      <Typography>{option}</Typography>
    </Box>
  );
}
