import * as React from "react";

import {
  Box,
  Checkbox,
  Autocomplete as MuiAutocomplete,
  TextField,
  Tooltip,
  Typography
} from "@mui/material";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";

import { AutocompleteProps } from "./Autocomplete.types";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { KeyValueOption } from "../Common.types";
import { isKeyValueOption } from "../utils/common";

export default function Autocomplete<
  Value extends KeyValueOption | string,
  Multiple extends boolean | undefined
>({
  disableCloseOnSelect = false,
  disabled = false,
  error = false,
  helperText,
  label,
  limitTags = -1,
  margin = "normal",
  multiple,
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
      getOptionLabel={(option: KeyValueOption | string) =>
        typeof option === "string" ? option : option.value
      }
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
      renderOption={multiple ? Option : OptionWithTooltip}
      value={value}
      clearIcon={multiple ? null : undefined}
      disabled={disabled}
      size={size}
      isOptionEqualToValue={(option, value) => {
        // if the option is a key value pair, compare option.value to value
        if (isKeyValueOption(option)) {
          if (option.value === value) {
            return true;
          }
        } else {
          // if the option is not a key value then compare option to value
          if (option === value) {
            return true;
          }
        }

        // if the option is not a match, return false
        return false;
      }}
    />
  );
}

// renderer for a checkbox option
function Option(
  props: React.HTMLAttributes<HTMLLIElement>,
  option: KeyValueOption | string,
  { selected }: { selected: boolean }
) {
  return (
    <Box component="li" {...props}>
      <Checkbox
        icon={<CheckBoxOutlineBlank fontSize="small" />}
        checkedIcon={<CheckBox fontSize="small" />}
        checked={selected}
        value={typeof option === "string" ? option : option.key}
      />
      <Typography>
        {typeof option === "string" ? option : option.value}
      </Typography>
    </Box>
  );
}

// renderer for a tooltip icon
function OptionWithTooltip(
  props: React.HTMLAttributes<HTMLLIElement>,
  option: KeyValueOption | string
) {
  if (typeof option === "object") {
    return (
      <Box
        {...props}
        component="li"
        sx={{
          justifyContent: "space-between !important"
        }}
      >
        <Typography>{option.value}</Typography>
        {option.tooltip ? (
          <Tooltip title={option.tooltip} placement="right" arrow>
            <ErrorOutlineIcon
              sx={{ pl: 1 }}
              color="primary"
              data-testid={`tooltip-${option.key}`}
            />
          </Tooltip>
        ) : null}
      </Box>
    );
  } else {
    return (
      <Box component="li" {...props}>
        <Typography>{option}</Typography>
      </Box>
    );
  }
}
