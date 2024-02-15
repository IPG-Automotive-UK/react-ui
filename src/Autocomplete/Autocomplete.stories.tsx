import { Meta, StoryFn, StoryObj } from "@storybook/react";

import Autocomplete from "./Autocomplete";
import { AutocompleteProps } from "./Autocomplete.types";
import { KeyValueOption } from "../Common.types";
import React from "react";
import { action } from "@storybook/addon-actions";
import { useArgs } from "@storybook/preview-api";

/**
 * Story metadata
 */
const meta: Meta<typeof Autocomplete> = {
  component: Autocomplete,
  title: "Selectors/Autocomplete"
};
export default meta;

// Typescript does not support readonly arrays with Array.isArray so we need a custom type guard for this story
function isReadOnlyArray<T>(
  value: T | ReadonlyArray<T>
): value is ReadonlyArray<T> {
  return Array.isArray(value);
}

// Define the template for the story
const Template: StoryFn<
  AutocompleteProps<string | KeyValueOption, boolean | undefined>
> = args => {
  // Use the useArgs hook to get and update the args
  const [{ value, multiple }, updateArgs] =
    useArgs<AutocompleteProps<string | KeyValueOption, boolean | undefined>>();

  // Use an effect to update the value arg based on the multiple arg
  React.useEffect(() => {
    if (multiple && value && !isReadOnlyArray(value))
      updateArgs({ value: value !== "" ? [value] : [] });
    if (!multiple && isReadOnlyArray(value))
      updateArgs({ value: value.length > 0 ? value[0] : "" });
  }, [updateArgs, multiple, value]);

  // Determine the value to use based on the multiple and value args
  let theValue;
  if (multiple && Array.isArray(value)) theValue = value;
  if (multiple && !Array.isArray(value) && value) theValue = [value];
  if (!multiple && Array.isArray(value)) theValue = value[0];
  if (!multiple && !Array.isArray(value)) theValue = value;

  // Return the Autocomplete component with the appropriate props
  return (
    <Autocomplete
      {...args}
      onChange={(event, newValue) => {
        updateArgs({ value: newValue });
        action("onChange")(newValue);
      }}
      value={theValue}
      multiple={multiple}
    />
  );
};

// Define the default story
export const Default: StoryObj<typeof Autocomplete> = {
  args: {
    // Define the default args
    disabled: false,
    error: false,
    helperText: "Helper Text",
    label: "Select options",
    limitTags: -1,
    margin: "normal",
    multiple: false,
    options: [
      "Option 1",
      "Option 2",
      "Option 3",
      "Option 4",
      "Option 5",
      "Option 6"
    ],
    required: false,
    size: "medium",
    value: "Option 1",
    variant: "outlined"
  },
  render: Template
};

// Define the story for key-value options
export const KeyValueOptions: StoryObj<typeof Autocomplete> = {
  args: {
    // Define the args for key-value options
    disabled: false,
    error: false,
    helperText: "Helper Text",
    label: "Select options",
    limitTags: -1,
    margin: "normal",
    multiple: false,
    options: [
      { key: 1, value: "Option 1" },
      { key: 2, value: "Option 2" },
      { key: 3, value: "Option 3" },
      { key: 4, value: "Option 4" }
    ],
    required: false,
    size: "medium",
    value: { key: 1, value: "Option 1" },
    variant: "outlined"
  },
  render: Template
};

// Define the story for options with tooltips
export const KeyValueOptionsTooltip: StoryObj<typeof Autocomplete> = {
  args: {
    // Define the args for key-value options
    disabled: false,
    error: false,
    helperText: "Helper Text",
    label: "Select options",
    limitTags: -1,
    margin: "normal",
    multiple: false,
    options: [
      { key: 1, tooltip: "Tooltip 1", value: "Option 1" },
      { key: 2, tooltip: "Tooltip 2", value: "Option 2" },
      { key: 3, tooltip: "Tooltip 3", value: "Option 3" },
      { key: 4, tooltip: "Tooltip 4", value: "Option 4" }
    ],
    required: false,
    size: "medium",
    value: { key: 1, tooltip: "Tooltip 1", value: "Option 1" },
    variant: "outlined"
  },
  render: Template
};

// Define the story for multi-select
export const MultiSelect: StoryObj<typeof Autocomplete> = {
  args: {
    // Define the args for multi-select
    disableCloseOnSelect: true,
    disabled: false,
    error: false,
    helperText: "Helper Text",
    label: "Select options",
    limitTags: -1,
    margin: "normal",
    multiple: true,
    options: [
      "Option 1",
      "Option 2",
      "Option 3",
      "Option 4",
      "Option 5",
      "Option 6"
    ],
    required: false,
    size: "medium",
    value: [],
    variant: "outlined"
  },
  render: Template
};
