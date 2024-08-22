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
import { CheckboxFilterProps } from "./CheckboxFilter.types";
import { HTMLAttributes } from "react";

/**
 * A checkbox filter allows the user to select multiple options from a list.
 */
export default function CheckboxFilter({
  variant = "popper",
  limitTags = -1,
  options = [],
  value = [],
  ...props
}: CheckboxFilterProps) {
  // create default values object
  const defaults = {
    limitTags,
    options,
    value,
    variant
  };

  // return popper components
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
  onChange,
  options,
  value,
  disabled
}: CheckboxFilterProps) {
  return (
    <AlwaysOpenAutocomplete
      limitTags={limitTags}
      multiple
      onChange={onChange}
      options={options}
      renderInput={params => {
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
      disabled={disabled}
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
  onChange,
  options,
  value,
  disabled
}: CheckboxFilterProps) {
  return (
    <Autocomplete
      limitTags={limitTags}
      multiple
      onChange={onChange}
      options={options}
      renderInput={params => (
        <TextField {...params} label={label} name={name} />
      )}
      renderOption={Option}
      value={value}
      disabled={disabled}
    />
  );
}

// renderer for a checkbox option
function Option(
  props: HTMLAttributes<HTMLLIElement>,
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
