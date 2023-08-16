import { Box } from "@mui/material";
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
    <Box maxWidth={300}>
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
    </Box>
  );
};

export const Default = {
  args: {
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
  },

  render: Template
};

export const WithLabelOptions = {
  args: {
    ...Default.args,
    options: [
      {
        _id: 1,
        color: "#005FA8",
        description: "a really looooooooooooooooooong string",
        name: "label 1"
      },
      {
        _id: 2,
        color: "#f542e0",
        description: "second label",
        name: "a really looooooooooooooooooong string"
      }
    ]
  },

  render: Template
};

export const MediumSizeWithOptions = {
  args: {
    ...Default.args,
    options: [
      { _id: 1, color: "#005FA8", description: "first label", name: "label 1" },
      { _id: 2, color: "#f542e0", description: "second label", name: "label 2" }
    ],
    size: "medium"
  },

  render: Template
};

export const WithInitialValues = {
  args: {
    ...WithLabelOptions.args,
    value: [WithLabelOptions.args.options[0]]
  },

  render: Template
};

export const WithAddingEditingAndDeleteEnabled = {
  args: {
    ...WithLabelOptions.args,
    addEnabled: true,
    deleteEnabled: true,
    editEnabled: true
  },

  render: Template
};

export const CustomNameMaxLength = {
  args: {
    ...WithLabelOptions.args,
    addEnabled: true,
    deleteEnabled: true,
    editEnabled: true,
    nameMaxLength: 5
  },

  render: Template
};
