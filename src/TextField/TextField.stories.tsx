import { Meta, Story } from "@storybook/react";

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

const Template: Story<TextFieldProps> = args => {
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
const TemplateWithMaskEnabled: Story<TextFieldProps> = args => {
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

/**
 * Default story for the TextField component
 */
export const Default = Template.bind({});
Default.args = {
  disabled: false,
  helperText: "What are you going to type?",
  isFieldMasked: false,
  label: "Enter some text here",
  margin: "normal",
  required: false,
  size: "medium",
  variant: "outlined"
};

/**
 * Story for the TextField component with a masked input
 */
export const TextFieldWithMaskEnabled = TemplateWithMaskEnabled.bind({});
TextFieldWithMaskEnabled.args = {
  disabled: false,
  helperText: "e.g. 225/60R16",
  isFieldMasked: true,
  label: "Enter some text here",
  margin: "normal",
  required: false,
  size: "medium",
  variant: "outlined"
};

/**
 * Story for the TextField component with multiline enabled with dynamic rows
 */
export const TextFieldWithMultiline = Template.bind({});
TextFieldWithMultiline.args = {
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
};
