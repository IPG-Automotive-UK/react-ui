import * as React from "react";

import {
  AutocompleteRenderGetTagProps,
  AutocompleteRenderOptionState,
  Box,
  Checkbox,
  Chip,
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
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined
>({
  defaultValue,
  disableClearable,
  disableCloseOnSelect = false,
  disabled = false,
  error = false,
  helperText,
  inputValue,
  label,
  limitTags,
  margin = "normal",
  multiple,
  name,
  onBlur,
  onChange,
  options,
  required = false,
  size = "medium",
  value,
  variant = "outlined",
  noOptionsText = "No options available",
  readOnly = false
}: AutocompleteProps<Value, Multiple, DisableClearable>) {
  // helper function to render tags
  function Tags<Value extends KeyValueOption | string>(
    value: Value[],
    getTagProps: AutocompleteRenderGetTagProps,
    limitTags: number
  ) {
    const numTags = value.length;
    return (
      <>
        {value.slice(0, limitTags).map((option, index) => (
          <Chip
            {...getTagProps({ index })}
            key={isKeyValueOption(option) ? option.key : option}
            label={
              // truncate the tag label
              isKeyValueOption(option)
                ? option.value.length > 20
                  ? `${option.value.slice(0, 10)}...`
                  : option.value
                : option.length > 20
                  ? `${option.slice(0, 10)}...`
                  : option
            }
            size="small"
          />
        ))}
        {numTags > limitTags && `+${numTags - limitTags}`}
      </>
    );
  }
  return (
    <MuiAutocomplete
      noOptionsText={noOptionsText}
      defaultValue={defaultValue}
      disableClearable={disableClearable}
      disableCloseOnSelect={disableCloseOnSelect}
      inputValue={inputValue}
      limitTags={limitTags}
      multiple={multiple}
      onBlur={onBlur}
      onChange={onChange}
      options={options}
      getOptionLabel={option =>
        isKeyValueOption(option) ? option.value : String(option)
      }
      renderTags={
        limitTags
          ? (value, getTagProps) =>
              limitTags && Tags(value, getTagProps, limitTags)
          : undefined
      }
      renderInput={params => (
        <TextField
          {...params}
          label={label}
          error={error}
          helperText={helperText}
          InputProps={{
            ...params.InputProps,
            className: readOnly ? "Mui-disabled label.Mui-disabled" : undefined
          }}
          InputLabelProps={{
            ...params.InputLabelProps
          }}
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
      readOnly={readOnly}
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
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined
>(
  props: React.HTMLAttributes<HTMLLIElement>,
  option: KeyValueOption | string,
  { selected }: AutocompleteRenderOptionState,
  { multiple }: AutocompleteProps<Value, Multiple, DisableClearable>
) {
  // handle key value options rendering
  if (isKeyValueOption(option)) {
    return (
      <Box component="li" {...props} key={option.key}>
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
    <Box component="li" {...props} key={option}>
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
