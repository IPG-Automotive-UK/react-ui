import { Meta, StoryFn } from "@storybook/react";

import Autocomplete from "./Autocomplete";
import { AutocompleteProps } from "./Autocomplete.types";
import React from "react";
import { action } from "@storybook/addon-actions";

/**
 * Story metadata
 */
const meta: Meta<typeof Autocomplete> = {
  component: Autocomplete,
  title: "General/Autocomplete"
};
export default meta;

const Template: StoryFn<AutocompleteProps> = args => {
  const [value, setValue] = React.useState(args.value);
  React.useEffect(() => {
    setValue(args.value);
  }, [args.value]);
  const onChange = newValue => {
    setValue(newValue);
    action("onChange")(newValue);
  };
  return <Autocomplete {...args} onChange={onChange} value={value} />;
};

export const Default = {
  args: {
    label: "Select options",

    multiple: false,

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
