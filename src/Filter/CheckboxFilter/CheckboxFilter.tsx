import * as React from "react";

import { Box, Checkbox, TextField } from "@mui/material";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";

import Autocomplete from "../../Autocomplete/Autocomplete";
import { CheckboxFilterProps } from "./CheckboxFilter.types";
import { HTMLAttributes } from "react";
import NoWrapTypography from "../../NoWrapTypography";
import { sortFilterOptions } from "../sortFilterOptions";

/**
 * A checkbox filter allows the user to select multiple options from a list.
 */
export default function CheckboxFilter({
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
  return <CheckboxFilterPopper {...allProps} />;
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
      <NoWrapTypography data-testid="filter-option-label">
        {option}
      </NoWrapTypography>
    </Box>
  );
}
