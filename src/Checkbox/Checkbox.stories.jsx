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
    setChecked(event.target.checked);
    action("onChange")(event);
  };
  return <Checkbox {...args} checked={checked} onChange={onChange} />;
};

export const Default = {
  args: {
    checked: false,
    disabled: false,
    label: "Disabled",
    size: "medium",
    style: {}
  },

  render: Template
};

export const Uncontrolled = {
  args: {
    defaultChecked: true,
    disabled: false,
    label: "Uncontrolled",
    size: "medium",
    style: {}
  },

  render: Checkbox
};

export const styledCheckbox = {
  args: {
    checked: false,
    disabled: false,
    label: "Disabled",
    size: "medium",
    style: { border: "1px solid red", padding: "20px" }
  },

  render: Template
};
