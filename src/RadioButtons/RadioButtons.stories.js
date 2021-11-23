import RadioButtons from "./RadioButtons";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  component: RadioButtons,
  title: "General/RadioButtons"
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
  return (
    <div marginLeft="500px">
      <RadioButtons {...args} value={value} onChange={onChange} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  defaultValue: "A",
  disabled: false,
  labelPlacement: "end",
  row: false,
  title: "This is an example",
  values: ["A", "B", "C"]
};
