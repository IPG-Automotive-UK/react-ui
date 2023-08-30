import { Meta, StoryFn, StoryObj } from "@storybook/react";

import Autocomplete from "./Autocomplete";
import { AutocompleteProps } from "./Autocomplete.types";
import React from "react";
import { action } from "@storybook/addon-actions";
import { useArgs } from "@storybook/client-api";

/**
 * Story metadata
 */
const meta: Meta<typeof Autocomplete> = {
  component: Autocomplete,
  title: "General/Autocomplete"
};
export default meta;

const Template: StoryFn<
  AutocompleteProps<string, boolean | undefined>
> = args => {
  const [{ value, multiple }, updateArgs] =
    useArgs<AutocompleteProps<string, boolean | undefined>>();

  React.useEffect(() => {
    if (multiple && !Array.isArray(value) && value)
      updateArgs({ value: value !== "" ? [value] : [] });
    if (!multiple && Array.isArray(value))
      updateArgs({ value: value.length > 0 ? value[0] : "" });
  }, [updateArgs, multiple, value]);

  let theValue;
  if (multiple && Array.isArray(value)) theValue = value;
  if (multiple && !Array.isArray(value)) theValue = [value];
  if (!multiple && Array.isArray(value)) theValue = value[0];
  if (!multiple && !Array.isArray(value)) theValue = value;

  const onChange = (event, newValue) => {
    updateArgs({ value: newValue });
    action("onChange")(newValue);
  };
  return (
    <Autocomplete
      {...args}
      onChange={onChange}
      value={theValue}
      multiple={multiple}
    />
  );
};

export const Default: StoryObj<typeof Autocomplete> = {
  args: {
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

export const MultiSelect: StoryObj<typeof Autocomplete> = {
  args: {
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
