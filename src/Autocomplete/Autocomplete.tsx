import * as React from "react";

import {
  AutocompleteRenderOptionState,
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
      getOptionLabel={option =>
        isKeyValueOption(option) ? option.value : String(option)
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
      renderOption={Option}
      value={value}
      clearIcon={multiple ? null : undefined}
      disabled={disabled}
      size={size}
      isOptionEqualToValue={(option, value) =>
        isKeyValueOption(option) && isKeyValueOption(value)
          ? option.key === value.key
          : option === value
      }
    />
  );
}

// renderer for a checkbox option
function Option<
  Value extends KeyValueOption | string,
  Multiple extends boolean | undefined
>(
  props: React.HTMLAttributes<HTMLLIElement>,
  option: KeyValueOption | string,
  { selected }: AutocompleteRenderOptionState,
  { multiple }: AutocompleteProps<Value, Multiple>
) {
  // if the option is a key value pair, use the key as the value
  const optionValue = typeof option === "string" ? option : option.key;

  return (
    <Box component="li" {...props}>
      {typeof option === "object" ? (
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexGrow: 1,
            justifyContent: "space-between"
          }}
        >
          <Box sx={{ alignItems: "center", display: "flex" }}>
            {multiple ? (
              <Checkbox
                icon={<CheckBoxOutlineBlank fontSize="small" />}
                checkedIcon={<CheckBox fontSize="small" />}
                checked={selected}
                value={optionValue}
              />
            ) : null}
            <Typography>{option.value}</Typography>
          </Box>
          <Box sx={{ alignItems: "center", display: "flex" }}>
            {option.tooltip && (
              <Tooltip title={option.tooltip} placement="right" arrow>
                <ErrorOutlineIcon
                  sx={{ height: 20, pl: 1, width: 20 }}
                  color="primary"
                  data-testid={`tooltip-${option.key}`}
                />
              </Tooltip>
            )}
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            alignItems: "center",
            display: "flex"
          }}
        >
          {multiple ? (
            <Checkbox
              icon={<CheckBoxOutlineBlank fontSize="small" />}
              checkedIcon={<CheckBox fontSize="small" />}
              checked={selected}
              value={optionValue}
            />
          ) : null}
          <Typography>{option}</Typography>
        </Box>
      )}
    </Box>
  );
}
