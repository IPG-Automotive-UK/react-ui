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
import PropTypes from "prop-types";

/**
 * A checkbox filter allows the user to select multiple options from a list.
 */
export default function CheckboxFilter({
  variant = "popper",
  limitTags = -1,
  value = [],
  ...props
}) {
  const defaults = { limitTags, value };
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
  value
}) {
  return (
    <AlwaysOpenAutocomplete
      limitTags={limitTags}
      multiple
      onChange={(e, newValue) => onChange(newValue)}
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
  value
}) {
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
    />
  );
}

// renderer for a checkbox option
function Option(props, option, { selected }) {
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

// prop types
CheckboxFilter.propTypes = {
  /**
   * The label for the filter.
   */
  label: PropTypes.string,
  /**
   * The number of selected tags to show
   */
  limitTags: PropTypes.number,
  /**
   * Input name
   */
  name: PropTypes.string,
  /**
   * Callback function to handle changes
   * @param {Array} value - The new value
   * @returns {void}
   */
  onChange: PropTypes.func,
  /**
   * The options to select from
   * @type {Array}
   * @example
   * ["Option 1", "Option 2"]
   */
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  /**
   * The selected options
   * @type {Array}
   * @example
   * ["Option 1"]
   * @default []
   */
  value: PropTypes.arrayOf(PropTypes.string),
  /**
   * The variant of the filter
   * @type {string}
   * @default "popper"
   * @enum {"popper", "always-open"}
   */
  variant: PropTypes.oneOf(["popper", "always-open"])
};
