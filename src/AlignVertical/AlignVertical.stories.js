import * as React from "react";
import AlignVertical from "./AlignVertical";
import { action } from "@storybook/addon-actions";

export default {
  argTypes: {
    value: { type: "string" }
  },
  component: AlignVertical,
  title: "Text/AlignVertical"
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
  return <AlignVertical {...args} onChange={onChange} value={value} />;
};

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  orientation: "horizontal",
  size: "medium",
  value: "top"
};
