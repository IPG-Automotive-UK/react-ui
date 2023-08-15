import { Meta, StoryFn } from "@storybook/react";

import React from "react";
import SearchBar from ".";
import { SearchBarProps } from "./SearchBar.types";
import { action } from "@storybook/addon-actions";

/**
 * Story metadata
 */
const meta: Meta<typeof SearchBar> = {
  component: SearchBar,
  title: "General/SearchBar"
};
export default meta;

const Template: StoryFn<SearchBarProps> = args => {
  const [value, setValue] = React.useState(args.value);
  React.useEffect(() => {
    setValue(args.value);
  }, [args.value]);
  return (
    <SearchBar
      {...args}
      onChange={event => {
        setValue(event.target.value);
        action("onChange")(event);
      }}
      onBlur={event => {
        action("onBlur")(event);
      }}
      value={value}
    />
  );
};

export const Default = {
  args: {},
  render: Template
};

export const CustomPlaceholder = {
  args: { placeholder: "custom placeholder" },
  render: Template
};
