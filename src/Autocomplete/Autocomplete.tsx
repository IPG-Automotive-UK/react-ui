import * as React from "react";

import {
  AutocompleteProps,
  AutocompleteRenderGetTagProps,
  AutocompleteRenderOptionState,
  Box,
  Checkbox,
  Chip,
  Autocomplete as MUIAutocomplete,
  TextField,
  Tooltip,
  Typography
} from "@mui/material";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import {
  ListboxComponentProps,
  AutocompleteProps as ReactUIAutocompleteProps
} from "./Autocomplete.types";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { KeyValueOption } from "../Common.types";
import { VariableSizeList } from "react-window";
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
  readOnly = false,
  getOptionLabel,
  renderTags,
  renderOption,
  open,
  isOptionEqualToValue,
  renderInput
}: ReactUIAutocompleteProps<Value, Multiple, DisableClearable>) {
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
    <VirtualizedAutocomplete
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
      getOptionLabel={
        getOptionLabel ??
        (option => (isKeyValueOption(option) ? option.value : String(option)))
      }
      renderTags={
        renderTags ??
        (limitTags && limitTags > 0
          ? (value, getTagProps) => Tags(value, getTagProps, limitTags)
          : undefined) // Default if not provided
      }
      renderInput={
        renderInput ??
        (params => (
          <TextField
            {...params}
            label={label}
            error={error}
            helperText={helperText}
            slotProps={{
              input: {
                ...params.InputProps,
                className: readOnly
                  ? "Mui-disabled label.Mui-disabled"
                  : undefined
              },
              inputLabel: {
                ...params.InputLabelProps
              }
            }}
            name={name}
            margin={margin}
            required={required}
            variant={variant}
          />
        )) // Default if not provided
      }
      renderOption={renderOption ?? Option}
      value={value}
      clearIcon={multiple ? null : undefined}
      disabled={disabled}
      readOnly={readOnly}
      size={size}
      open={open ?? undefined}
      isOptionEqualToValue={
        isOptionEqualToValue ??
        ((option, value) =>
          isKeyValueOption(option) && isKeyValueOption(value)
            ? option.key === value.key
            : option === value)
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
  { multiple }: ReactUIAutocompleteProps<Value, Multiple, DisableClearable>
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

// Virtualized Listbox Component using react-window
const VirtualizedListbox = React.forwardRef<
  HTMLDivElement,
  ListboxComponentProps
>(function VirtualizedListbox(props, ref) {
  const { children, ...other } = props;

  // Define a variable for the extra height to account for padding
  const EXTRA_HEIGHT_FOR_PADDING = 16;

  // Convert children into an array for indexed access
  const items = React.Children.toArray(children) as React.ReactElement[];
  // Determines the total number of items in the list by counting the children elements passed to the virtualized list.
  const itemCount = items.length;
  // Define the height of each item in the virtualized list.
  const itemSize = 48;

  // Calculates the total height of the virtualized list, capping at 8 items (8 * itemSize) if itemCount exceeds 8, or using itemCount * itemSize for fewer items.
  const getHeight = () => (itemCount > 8 ? 8 * itemSize : itemCount * itemSize);

  return (
    <div
      ref={ref}
      {...other}
      style={{
        maxHeight: `${getHeight() + EXTRA_HEIGHT_FOR_PADDING}px`,
        overflowY: "auto"
      }}
    >
      <VariableSizeList
        height={getHeight()}
        itemCount={itemCount}
        itemSize={() => itemSize}
        width="100%"
      >
        {({ index, style }) => {
          const item = items[index];
          const { ...rest } = item.props;

          return (
            <div style={style} {...rest}>
              {item.props.children}
            </div>
          );
        }}
      </VariableSizeList>
    </div>
  );
});

// VirtualizedAutocomplete Component wrapping Material-UI's Autocomplete
export function VirtualizedAutocomplete<
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
>(props: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>) {
  return <MUIAutocomplete ListboxComponent={VirtualizedListbox} {...props} />;
}
