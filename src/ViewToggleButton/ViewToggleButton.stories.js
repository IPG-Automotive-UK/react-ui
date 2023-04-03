import React from "react";
import ViewToggleButton from "./ViewToggleButton";
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
  orientation: "horizontal",
  size: "medium",
  value: "card"
};
