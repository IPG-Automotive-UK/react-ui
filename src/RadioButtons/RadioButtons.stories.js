import RadioButtons from "./RadioButtons";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  argTypes: {
    value: { type: "string" }
  },
  component: RadioButtons,
  title: "General/RadioButtons"
};
const Template = args => {
  const [value, setValue] = React.useState(args.value);
  React.useEffect(() => {
    setValue(args.value);
  }, [args.value]);
  const onChange = (event, value) => {
    setValue(event.target.value);
    action("onChange")(event, value);
  };
  return (
    <div>
      <RadioButtons {...args} onChange={onChange} value={value} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  labelPlacement: "end",
  options: ["Option A", "Option B", "Option C"],
  row: false,
  size: "medium",
  style: {},
  title: "This is an example",
  value: "Option B"
};
