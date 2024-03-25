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
  defaultValue,
  disableCloseOnSelect = false,
  disabled = false,
  error = false,
  helperText,
  label,
  limitTags = -1,
  margin = "normal",
  multiple,
  name,
  onChange,
  options,
  required = false,
  size = "medium",
  value,
  variant = "outlined"
}: AutocompleteProps<Value, Multiple>) {
  return (
    <MuiAutocomplete
      defaultValue={defaultValue}
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
          name={name}
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
  // handle key value options rendering
  if (isKeyValueOption(option)) {
    return (
      <Box component="li" {...props}>
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
                value={option.key}
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
      </Box>
    );
  }

  // handle string options rendering
  return (
    <Box component="li" {...props}>
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
            value={option}
          />
        ) : null}
        <Typography>{option}</Typography>
      </Box>
    </Box>
  );
}
