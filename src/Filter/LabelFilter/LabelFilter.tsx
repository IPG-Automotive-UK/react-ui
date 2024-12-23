import * as React from "react";

import {
  AutocompleteOwnerState,
  AutocompleteRenderGetTagProps,
  Box,
  Checkbox,
  TextField,
  Typography
} from "@mui/material";

import { Label } from "../../LabelSelector/Label.types";
import LabelChip from "../../LabelSelector/LabelChip/LabelChip";
import { LabelFilterProps } from ".";
import { VirtualizedAutocomplete } from "../../Autocomplete/Autocomplete";

/**
 * A label filter allows the user to select multiple labels from a list.
 */
export default function LabelFilter({
  value = [],
  limitTags = -1,
  ...props
}: LabelFilterProps) {
  const defaults = { limitTags, value };
  return <LabelFilterPopper {...props} {...defaults} />;
}

/**
 * A label filter that opens a popper above other elements.
 */
function LabelFilterPopper({
  label,
  name,
  onChange,
  options,
  value,
  limitTags
}: LabelFilterProps) {
  return (
    <VirtualizedAutocomplete
      getOptionLabel={option => option.name}
      isOptionEqualToValue={(option, value) => option._id === value._id}
      limitTags={limitTags}
      multiple
      noOptionsText="No labels"
      onChange={(e, newValue) => onChange?.(newValue)}
      options={options}
      value={value}
      renderInput={params => (
        <TextField {...params} label={label} name={name} />
      )}
      renderOption={Option}
      renderTags={Tags}
    />
  );
}

// render for label chips
function Tags(
  labels: Label[],
  getTagProps: AutocompleteRenderGetTagProps,
  ownerState: AutocompleteOwnerState<Label, true, undefined, undefined, "div">
) {
  const value = ownerState.value || []; // Current selected labels
  const onChange = ownerState.onChange || (() => {}); // No-op if onChange is not provided
  return labels.map((label, index) => (
    <LabelChip
      key={label._id}
      label={label.name}
      color={label.color}
      style={{ marginLeft: 2 }}
      onDelete={e => {
        const updatedValue = value.filter(l => l._id !== label._id); // Remove label from the value
        // Trigger onChange with event, updated value, reason, and details
        onChange(e as React.SyntheticEvent, updatedValue, "removeOption", {
          option: label
        });
      }}
      clickable={false}
    />
  ));
}

// Render label options
function Option(
  props: React.HTMLAttributes<HTMLLIElement>,
  option: Label,
  { selected }: { selected: boolean }
) {
  const { key, ...restProps } = props as { key?: React.Key }; // Extract key explicitly
  return (
    <li key={key} {...restProps}>
      <Checkbox
        checked={selected}
        sx={{
          "&.Mui-checked": {
            color: option.color
          },
          color: option.color,
          ml: -1,
          mr: 1
        }}
      />
      <Box
        sx={{
          flexGrow: 1
        }}
      >
        <Typography mb={-0.5}>{option.name}</Typography>
        <Typography variant="caption">
          {option.description || "No description"}
        </Typography>
      </Box>
    </li>
  );
}
