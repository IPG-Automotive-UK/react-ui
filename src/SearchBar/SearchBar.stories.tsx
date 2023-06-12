import React from "react";
import SearchBar from "./SearchBar";
import { action } from "@storybook/addon-actions";

export default {
  component: SearchBar,
  title: "General/SearchBar"
};

const Template = args => {
  const [value, setValue] = React.useState(args.value);
  React.useEffect(() => {
    setValue(args.value);
  }, [args.value]);
  return (
    <SearchBar
      {...args}
      onChange={event => {
        if (event.target instanceof HTMLInputElement) {
          setValue(event.target.value);
        }
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
