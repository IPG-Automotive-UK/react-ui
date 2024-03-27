import React from "react";
import SwitchField from "./SwitchField";
import { action } from "@storybook/addon-actions";

export default {
  component: SwitchField,
  title: "General/SwitchField"
};

const Template = args => {
  const [checked, setChecked] = React.useState(undefined);

  React.useEffect(() => {
    setChecked(args.checked);
  }, [args.checked]);

  return (
    <SwitchField
      {...args}
      checked={checked}
      defaultChecked={args.defaultChecked}
      onChange={(...args) => {
        setChecked(!checked);
        action("onChange")(...args);
      }}
    />
  );
};

export const Default = {
  args: {
    checked: false,
    defaultChecked: false,
    helperText: "Maybe you need some help?",
    label: "Make a choice",
    options: ["Choice A", "Choice B"],
    size: "medium"
  },

  render: Template
};

export const Uncontrolled = {
  args: {
    defaultChecked: true,
    helperText: "Maybe you need some help?",
    label: "Make a choice",
    name: "switch",
    options: ["Choice A", "Choice B"],
    size: "medium"
  },

  render: SwitchField
};

export const Disabled = {
  args: {
    checked: false,
    disabled: true,
    helperText: "Maybe you need some help?",
    label: "Make a choice",
    options: ["Choice A", "Choice B"],
    size: "medium"
  },

  render: Template
};
