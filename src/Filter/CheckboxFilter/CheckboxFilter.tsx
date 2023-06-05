import * as React from "react";

import {
  Autocomplete,
  Box,
  Checkbox,
  TextField,
  Typography,
  autocompleteClasses
} from "@mui/material";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";

import AlwaysOpenAutocomplete from "../AlwaysOpenAutocomplete";
import { AutocompleteRenderOptionState } from "@mui/material/Autocomplete";
import { CheckboxFilterProps } from "./CheckboxFilter.types";
import { TextFieldProps } from "@mui/material/TextField";

/**
 * A checkbox filter allows the user to select multiple options from a list.
 */
export default function CheckboxFilter({
  variant = "popper",
  limitTags = -1,
  value = [],
  size = "medium",
  ...props
}: CheckboxFilterProps) {
  const defaults = { limitTags, size, value };
  return variant === "popper" ? (
    <CheckboxFilterPopper {...props} {...defaults} />
  ) : (
    <CheckboxFilterAlwaysOpen {...props} {...defaults} />
  );
}

/**
 * An inline checkbox filter is always open and the popper does not sit above other elements.
 */
function CheckboxFilterAlwaysOpen({
  label,
  limitTags,
  name,
  onChange = () => {},
  options,
  value,
  size
}: CheckboxFilterProps) {
  return (
    <AlwaysOpenAutocomplete
      limitTags={limitTags}
      multiple
      onChange={(e: React.ChangeEvent<{}>, newValue: string[]) =>
        onChange(newValue)
      }
      options={options}
      renderInput={(params: TextFieldProps) => {
        return (
          <TextField
            {...params}
            label={label}
            name={name}
            sx={{
              [`& .${autocompleteClasses.popupIndicator}`]: { display: "none" }
            }}
          />
        );
      }}
      renderOption={Option}
      value={value}
      size={size}
    />
  );
}

/**
 * A checkbox filter that opens a popper above other elements.
 */
function CheckboxFilterPopper({
  label,
  limitTags,
  name,
  onChange = () => {},
  options,
  value,
  size
}: CheckboxFilterProps) {
  return (
    <Autocomplete
      limitTags={limitTags}
      multiple
      onChange={(e, newValue) => onChange(newValue)}
      options={options}
      renderInput={params => (
        <TextField {...params} label={label} name={name} />
      )}
      renderOption={Option}
      value={value}
      size={size}
    />
  );
}

// renderer for a checkbox option
function Option(
  props: React.HTMLAttributes<HTMLLIElement>,
  option: string,
  state: AutocompleteRenderOptionState
) {
  const { selected } = state;

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
