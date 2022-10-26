import LabelSelector from "./LabelSelector";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  component: LabelSelector,
  title: "General/LabelSelector"
};

const Template = args => {
  // value state
  const [value, setValue] = React.useState(args.value);

  // options state
  const [options, setOptions] = React.useState(args.options);

  return (
    <LabelSelector
      {...args}
      onChange={selectedValues => {
        setValue(selectedValues);

        // fire action
        action("onChange")(selectedValues);
      }}
      options={options}
      value={value}
      onNew={newLabel => {
        // append id to new label
        newLabel._id = options.length + 1;

        // add new label to options
        setOptions([...options, newLabel]);

        // add new label to current value
        setValue([...value, newLabel]);

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

        // replace edited label in current value
        setValue(
          value.map(value => {
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

        // remove deleted label from current value
        setValue(value.filter(value => value._id !== deletedLabel._id));

        // fire action
        action("onDelete")(deletedLabel);
      }}
    />
  );
};

// default
export const Default = Template.bind({});
Default.args = {
  addEnabled: false,
  autocompleteLabel: "",
  deleteEnabled: false,
  editEnabled: false,
  limitTags: -1,
  multiple: true,
  nameMaxLength: 50,
  onChange: () => {},
  onDelete: () => {},
  onEdit: () => {},
  onNew: () => {},
  options: [],
  size: "small",
  value: []
};

// with label options
export const WithLabelOptions = Template.bind({});
WithLabelOptions.args = {
  ...Default.args,
  options: [
    { _id: 1, color: "#005FA8", description: "first label", name: "label 1" },
    { _id: 2, color: "#f542e0", description: "second label", name: "label 2" }
  ]
};

export const MediumSizeWithOptions = Template.bind({});
MediumSizeWithOptions.args = {
  ...Default.args,
  options: [
    { _id: 1, color: "#005FA8", description: "first label", name: "label 1" },
    { _id: 2, color: "#f542e0", description: "second label", name: "label 2" }
  ],
  size: "medium"
};

// with initial value
export const WithInitialValues = Template.bind({});
WithInitialValues.args = {
  ...WithLabelOptions.args,
  value: [WithLabelOptions.args.options[0]]
};

// with add new label enabled
export const WithAddingEditingAndDeleteEnabled = Template.bind({});
WithAddingEditingAndDeleteEnabled.args = {
  ...WithLabelOptions.args,
  addEnabled: true,
  deleteEnabled: true,
  editEnabled: true
};

// custom max label lentgh
export const CustomNameMaxLength = Template.bind({});
CustomNameMaxLength.args = {
  ...WithLabelOptions.args,
  addEnabled: true,
  deleteEnabled: true,
  editEnabled: true,
  nameMaxLength: 5
};
