import FontStyle from "./FontStyle";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  argTypes: {
    value: { type: "array" }
  },
  component: FontStyle,
  title: "Text/FontStyle"
};

const Template = args => {
  const [value, setValue] = React.useState(args.value);
  React.useEffect(() => {
    setValue(args.value);
  }, [args.value]);
  const onChange = (event, value) => {
    setValue(value);
    action("onChange")(event, [...value]);
  };
  return <FontStyle {...args} onChange={onChange} value={value} />;
};

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  orientation: "horizontal",
  size: "medium",
  value: []
};
