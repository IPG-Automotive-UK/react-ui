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
  argTypes: {
    margin: {
      control: "select",
      description: "none | dense | normal",
      options: ["none", "dense", "normal"]
    },
    size: {
      control: "select",
      options: ["small", "medium"]
    },
    variant: {
      control: "select",
      options: ["standard", "outlined", "filled"]
    }
  },
  component: Autocomplete,
  title: "Selectors/Autocomplete"
};

export default meta;
type Story = StoryObj<typeof Autocomplete>;

// Typescript does not support readonly arrays with Array.isArray so we need a custom type guard for this story
function isReadOnlyArray<T>(
  value: T | ReadonlyArray<T>
): value is ReadonlyArray<T> {
  return Array.isArray(value);
}

// Define the template for the story
const Template: StoryFn<
  AutocompleteProps<
    string | KeyValueOption,
    boolean | undefined,
    boolean | undefined
  >
> = args => {
  // Use the useArgs hook to get and update the args
  const [{ value, multiple }, updateArgs] =
    useArgs<
      AutocompleteProps<
        string | KeyValueOption,
        boolean | undefined,
        boolean | undefined
      >
    >();

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
      onBlur={event => action("onBlur")}
      value={theValue}
      multiple={multiple}
    />
  );
};

// Define the default args
const defaultArgs: Story["args"] = {
  disableClearable: false,
  disabled: false,
  error: false,
  helperText: "Helper Text",
  inputValue: undefined,
  label: "Select options",
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
  readOnly: false,
  required: false,
  size: "medium",
  variant: "outlined"
};

// Define the default story
export const Default: Story = {
  args: {
    // Define the default story args
    ...defaultArgs,
    value: "Option 1"
  },
  render: Template
};

// Define the uncontrolled story
export const Uncontrolled: Story = {
  args: {
    // Define the uncontrolled story args
    ...defaultArgs,
    defaultValue: "Option 4",
    onBlur: action("onBlur")
  },
  render: Autocomplete
};

// Define the story for key-value options
export const KeyValueOptions: Story = {
  args: {
    // Define the key-value options story args
    ...defaultArgs,
    options: [
      { key: 1, value: "Option 1" },
      { key: 2, value: "Option 2" },
      { key: 3, value: "Option 3" },
      { key: 4, value: "Option 4" }
    ],
    value: { key: 1, value: "Option 1" }
  },
  render: Template
};

// Define the story for options with tooltips
export const KeyValueOptionsTooltip: Story = {
  args: {
    // Define the key-value options tooltips story args
    ...defaultArgs,
    options: [
      { key: 1, tooltip: "Tooltip 1", value: "Option 1" },
      { key: 2, tooltip: "Tooltip 2", value: "Option 2" },
      { key: 3, tooltip: "Tooltip 3", value: "Option 3" },
      { key: 4, tooltip: "Tooltip 4", value: "Option 4" }
    ],
    value: { key: 1, tooltip: "Tooltip 1", value: "Option 1" }
  },
  render: Template
};

// Define the story for multi-select
export const MultiSelect: Story = {
  args: {
    // Define the multi-select story args
    ...defaultArgs,
    disableCloseOnSelect: true,
    multiple: true,
    value: []
  },
  render: Template
};

// Define story for multi-select with limit tags
export const MultiSelectWithLimitTags: Story = {
  args: {
    ...defaultArgs,
    disableCloseOnSelect: true,
    limitTags: 1,
    multiple: true
  }
};

// Define the read only story
export const ReadOnly: Story = {
  args: {
    // Define the read-only story args
    ...defaultArgs,
    defaultValue: "Option 4",
    inputValue: "Option 4",
    readOnly: true,
    required: true
  },
  render: Template
};

// Define the disable clearable story
export const DisableClearable: Story = {
  args: {
    // Define the disable clearable story args
    ...defaultArgs,
    defaultValue: "Option 4",
    disableClearable: true,
    onBlur: action("onBlur")
  },
  render: Autocomplete
};
