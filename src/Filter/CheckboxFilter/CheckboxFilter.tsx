import * as React from "react";

import {
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
import { VirtualizedAutocomplete } from "./VirtualizedAutocomplete";
import { sortFilterOptions } from "../sortFilterOptions";

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
  // create default values object and merge with other props
  const defaults = {
    limitTags,
    options,
    value
  };
  const allProps = { ...props, ...defaults };

  // return popper components
  return variant === "popper" ? (
    <CheckboxFilterPopper {...allProps} />
  ) : (
    <CheckboxFilterAlwaysOpen {...allProps} />
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
}: Omit<CheckboxFilterProps, "variant">) {
  // ensure the onChange value is always an array because we are using a multi-select
  const handleOnChange = (newValue: string | string[] | null) => {
    if (newValue === null) {
      onChange([]);
    } else {
      onChange(Array.isArray(newValue) ? newValue : [newValue]);
    }
  };

  return (
    <AlwaysOpenAutocomplete
      limitTags={limitTags}
      multiple
      onChange={(_e, newValue) => handleOnChange(newValue)}
      options={sortFilterOptions(options)}
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
}: Omit<CheckboxFilterProps, "variant">) {
  return (
    <VirtualizedAutocomplete
      limitTags={limitTags}
      multiple
      onChange={(_e, newValue) => onChange(newValue)}
      options={sortFilterOptions(options)}
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
  { selected }: { selected: boolean },
  { disabled }: Pick<CheckboxFilterProps, "disabled">
) {
  return (
    <Box
      component="li"
      {...props}
      key={option}
      sx={{
        ...(disabled && {
          opacity: 0.5,
          pointerEvents: "none"
        })
      }}
    >
      <Checkbox
        checkedIcon={<CheckBox fontSize="small" />}
        checked={selected}
        disabled={disabled}
        icon={<CheckBoxOutlineBlank fontSize="small" />}
        value={option}
      />
      <Typography data-testid="filter-option-label">{option}</Typography>
    </Box>
  );
}
