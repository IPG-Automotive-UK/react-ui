import { Meta, StoryFn } from "@storybook/react";

import MaskedInput from "react-text-mask";
import React from "react";
import TextField from "./TextField";
import { TextFieldProps } from "./TextField.types";
import { action } from "@storybook/addon-actions";

const meta: Meta<typeof TextField> = {
  component: TextField,
  title: "Text/TextField"
};
export default meta;

const Template: StoryFn<TextFieldProps> = args => {
  const [value, setValue] = React.useState(args.value);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    setValue(args.value);
  }, [args.value]);
  const onChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setValue(value);
    setError(event.target.value.indexOf("_") > 0);
    action("onChange")(event, event.target.value);
  };
  return (
    <TextField {...args} onChange={onChange} value={value} error={error} />
  );
};

const UncontrolledTemplate: StoryFn<TextFieldProps> = args => {
  return <TextField {...args} defaultValue={args.defaultValue} />;
};

// masked input to be in the form of 225/60R16
const MaskedTextField = React.forwardRef((props, ref) => (
  <MaskedInput
    {...props}
    mask={[/[1-9]/, /\d/, /\d/, "/", /[1-9]/, /\d/, "R", /[1-9]/, /\d/]}
    keepCharPositions={true}
  />
));
MaskedTextField.displayName = "MaskedTextField";

/**
 * Story template for the TextField component
 */
const TemplateWithMaskEnabled: StoryFn<TextFieldProps> = args => {
  const [value, setValue] = React.useState(args.value);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    setValue(args.value);
  }, [args.value]);
  const onChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setValue(event.target.value);
    setError(event.target.value.indexOf("_") > 0);
    action("onChange")(event, event.target.value);
  };

  return (
    <TextField
      {...args}
      InputProps={{ inputComponent: MaskedTextField }}
      onChange={onChange}
      value={value}
      error={error}
    />
  );
};

export const Default = {
  args: {
    disabled: false,
    helperText: "What are you going to type?",
    isFieldMasked: false,
    label: "Enter some text here",
    margin: "normal",
    required: false,
    size: "medium",
    variant: "outlined"
  },

  render: Template
};

export const UncontrolledDefault = {
  args: {
    defaultValue: "Uncontrolled",
    disabled: false,
    helperText: "What are you going to type?",
    isFieldMasked: false,
    label: "Enter some text here",
    margin: "normal",
    required: false,
    size: "medium",
    variant: "outlined"
  },

  render: UncontrolledTemplate
};

export const TextFieldWithMaskEnabled = {
  args: {
    disabled: false,
    helperText: "e.g. 225/60R16",
    isFieldMasked: true,
    label: "Enter some text here",
    margin: "normal",
    required: false,
    size: "medium",
    variant: "outlined"
  },

  render: TemplateWithMaskEnabled
};

export const TextFieldWithMultiline = {
  args: {
    disabled: false,
    isFieldMasked: false,
    label: "Enter some text here",
    margin: "normal",
    maxRows: 4,
    minRows: 2,
    multiline: true,
    required: true,
    size: "medium",
    variant: "outlined"
  },

  render: Template
};
