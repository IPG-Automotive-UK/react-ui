import AlignHorizontal from "./AlignHorizontal";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  argTypes: {
    value: { type: "string" }
  },
  component: AlignHorizontal,
  title: "Text/AlignHorizontal"
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
  return <AlignHorizontal {...args} onChange={onChange} value={value} />;
};

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  orientation: "horizontal",
  size: "medium",
  value: "left"
};
