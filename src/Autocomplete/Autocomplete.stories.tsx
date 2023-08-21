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
  console.log("args", args.multiple);
  const [value, setValue] = React.useState(args.value);
  React.useEffect(() => {
    if (args.multiple) {
      console.log("in use effect multiple");
      setValue([]);
    } else {
      setValue(args.value);
    }
  }, [args.value, args.multiple]);

  const onChange = newValue => {
    setValue(newValue);
    action("onChange")(newValue);
  };
  return <Autocomplete {...args} onChange={onChange} value={value} />;
};

export const Default = {
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
