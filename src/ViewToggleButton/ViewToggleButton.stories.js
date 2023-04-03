import React from "react";
import ViewToggleButton from ".";
import { action } from "@storybook/addon-actions";

export default {
  component: ViewToggleButton,
  title: "General/ViewToggleButton"
};

const Template = args => {
  const [value, setValue] = React.useState(args.value);
  React.useEffect(() => {
    setValue(args.value);
  }, [args.value]);
  const onChange = (event, value) => {
    setValue(value);
    action("onChange")(event, value);
  };
  return <ViewToggleButton {...args} onChange={onChange} value={value} />;
};

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  size: "medium",
  value: "card"
};
