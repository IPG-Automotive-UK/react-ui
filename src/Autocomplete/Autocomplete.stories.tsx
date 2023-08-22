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

  const onChange = newValue => {
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
    label: "Select options",
    multiple: true,
    options: [
      "Nikitha",
      "Nikitha 1",
      "Nikitha 22",
      "Nikitha333",
      "Nikitha 4444 ",
      "Nikitha 55555",
      "Nikitha 56666"
    ],
    value: []
  },
  render: Template
};
