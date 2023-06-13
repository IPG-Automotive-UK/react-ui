import { Meta, Story } from "@storybook/react";

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

const Template: Story<SearchBarProps> = args => {
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

export const Default = Template.bind({});
Default.args = {};

export const CustomPlaceholder = Template.bind({});
CustomPlaceholder.args = { placeholder: "custom placeholder" };
