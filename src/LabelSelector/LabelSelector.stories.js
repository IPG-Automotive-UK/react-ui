import LabelSelector from "./LabelSelector";
import React from "react";

export default {
  argTypes: {
    isAdmin: { type: "boolean" },
    label: { type: "string" },
    limitTags: { type: "number" },
    multiple: { type: "boolean" },
    onChange: { type: "function" },
    options: { type: "array" }
  },
  component: LabelSelector,
  title: "General/LabelSelector"
};

const Template = args => {
  // values state
  const [values, setValues] = React.useState(args.values);

  // options state
  const [options, setOptions] = React.useState(args.options);

  return (
    <LabelSelector
      {...args}
      onChange={(_e, value) => setValues(value)}
      options={options}
      values={values}
      onNewLabel={(_e, newLabel) => {
        // append id to new label
        newLabel._id = options.length + 1;

        // add new label to options
        setOptions([...options, newLabel]);

        // add new label to current values
        setValues([...values, newLabel]);
      }}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  isAdmin: false,
  label: "",
  limitTags: -1,
  multiple: true,
  onChange: () => {},
  options: [],
  values: []
};

export const WithOptions = Template.bind({});
WithOptions.args = {
  isAdmin: false,
  label: "",
  limitTags: -1,
  multiple: true,
  onChange: () => {},
  options: [
    { _id: 1, color: "#005FA8", description: "first label", name: "label 1" },
    { _id: 2, color: "#f542e0", description: "second label", name: "label 2" }
  ],
  values: []
};
