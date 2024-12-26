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
import { LabelFilterProps } from "./LabelFilter.types";
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

// Render for label chips
/**
 * Renders the selected labels as chips with delete functionality.
 * @param labels - The array of selected labels to display as chips.
 * @param getTagProps - A function provided by Material-UI to generate props for each tag.
 * @param ownerState - The owner state of the Autocomplete component, including `value` and `onChange` handler.
 * @returns An array of LabelChip components representing the selected labels.
 */
function Tags(
  labels: Label[],
  getTagProps: AutocompleteRenderGetTagProps,
  ownerState: AutocompleteOwnerState<Label, true, undefined, undefined, "div">
) {
  // Extract current selected labels and onChange handler from ownerState
  const { value = [], onChange = () => {} } = ownerState;
  return labels.map((label, index) => (
    <LabelChip
      key={label._id}
      label={label.name}
      color={label.color}
      style={{ marginLeft: 2 }}
      onDelete={e => {
        // Remove label from the value
        const updatedValue = value.filter(l => l._id !== label._id);
        // Trigger onChange with event, updated value, reason, and details
        onChange(e, updatedValue, "removeOption", {
          option: label
        });
      }}
      clickable={false}
    />
  ));
}

// Render label options
/**
 * Renders a single option in the dropdown for selection.
 * @param props - HTML attributes for the list item element.
 * @param option - The label object representing the current option.
 * @param selected - Indicates whether the current option is selected.
 * @returns A list item element representing the label option.
 */
function Option(
  props: React.HTMLAttributes<HTMLLIElement>,
  option: Label,
  { selected }: { selected: boolean }
) {
  // Extract key explicitly
  const { key, ...restProps } = props as { key?: React.Key };
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
