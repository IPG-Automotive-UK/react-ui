import Checkbox from "./Checkbox";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  component: Checkbox,
  title: "General/Checkbox"
};

const Template = args => {
  const [checked, setChecked] = React.useState(false);
  React.useEffect(() => {
    setChecked(args.checked);
  }, [args.checked]);
  const onChange = event => {
    setChecked(!checked);
    action("onChange")(event);
  };
  return <Checkbox {...args} checked={checked} onChange={onChange} />;
};

export const Default = Template.bind({});
Default.args = {
  checked: false,
  disabled: false,
  label: "Disabled",
  size: "medium"
};
