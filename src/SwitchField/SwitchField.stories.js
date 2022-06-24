import React from "react";
import SwitchField from "./SwitchField";
import { action } from "@storybook/addon-actions";

export default {
  component: SwitchField,
  title: "General/SwitchField"
};

const Template = args => {
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    setChecked(args.checked);
  }, [args.checked]);

  return (
    <SwitchField
      {...args}
      checked={checked}
      onChange={(...args) => {
        setChecked(!checked);
        action("onChange")(...args);
      }}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  checked: false,
  helperText: "Maybe you need some help?",
  label: "Make a choice",
  options: ["Choice A", "Choice B"],
  size: "medium"
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  helperText: "Maybe you need some help?",
  label: "Make a choice",
  options: ["Choice A", "Choice B"],
  size: "medium"
};
