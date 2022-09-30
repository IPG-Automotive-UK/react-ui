import LabelSelector from "./LabelSelector";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  argTypes: {
    addEnabled: { type: "boolean" },
    autocompleteLabel: { type: "string" },
    deleteEnabled: { type: "boolean" },
    editEnabled: { type: "boolean" },
    limitTags: { type: "number" },
    multiple: { type: "boolean" },
    onChange: { type: "function" },
    onDelete: { type: "function" },
    onEdit: { type: "function" },
    onNew: { type: "function" },
    options: { type: "array" },
    values: { type: "array" }
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
      onChange={selectedValues => {
        setValues(selectedValues);

        // fire action
        action("onChange")(selectedValues);
      }}
      options={options}
      values={values}
      onNew={newLabel => {
        // append id to new label
        newLabel._id = options.length + 1;

        // add new label to options
        setOptions([...options, newLabel]);

        // add new label to current values
        setValues([...values, newLabel]);

        // fire action
        action("onNew")(newLabel);
      }}
      onEdit={editedLabel => {
        // replace edited label in options
        setOptions(
          options.map(option => {
            if (option._id === editedLabel._id) {
              return editedLabel;
            }
            return option;
          })
        );

        // replace edited label in current values
        setValues(
          values.map(value => {
            if (value._id === editedLabel._id) {
              return editedLabel;
            }
            return value;
          })
        );

        // fire action
        action("onEdit")(editedLabel);
      }}
      onDelete={deletedLabel => {
        // remove deleted label from options
        setOptions(options.filter(option => option._id !== deletedLabel._id));

        // remove deleted label from current values
        setValues(values.filter(value => value._id !== deletedLabel._id));

        // fire action
        action("onDelete")(deletedLabel);
      }}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  addEnabled: false,
  autocompleteLabel: "",
  deleteEnabled: false,
  editEnabled: false,
  limitTags: -1,
  multiple: true,
  onChange: () => {},
  onDelete: () => {},
  onEdit: () => {},
  onNew: () => {},
  options: [],
  values: []
};

export const WithOptions = Template.bind({});
WithOptions.args = {
  addEnabled: false,
  autocompleteLabel: "",
  deleteEnabled: false,
  editEnabled: false,
  limitTags: -1,
  multiple: true,
  onChange: () => {},
  onDelete: () => {},
  onEdit: () => {},
  onNew: () => {},
  options: [
    { _id: 1, color: "#005FA8", description: "first label", name: "label 1" },
    { _id: 2, color: "#f542e0", description: "second label", name: "label 2" }
  ],
  values: []
};
