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
  React.useEffect(() => {
    setValue(args.value);
  }, [args.value]);
  const onChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setValue(value);
    action("onChange")(event, event.target.value);
  };
  return <TextField {...args} onChange={onChange} value={value} />;
};

// masked input
const TextFieldMask = React.forwardRef((props, ref) => (
  <MaskedInput
    {...props}
    mask={[/[1-9]/, /\d/, /\d/, "/", /[1-9]/, /\d/, "R", /[1-9]/, /\d/]}
    keepCharPositions={true}
  />
));
TextFieldMask.displayName = "TextFieldMask";

/**
 * Story template for the TextField component
 */
const TemplateWithInputProps: Story<TextFieldProps> = args => {
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
      InputProps={{ inputComponent: TextFieldMask }}
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
  error: false,
  helperText: "What are you going to type?",
  label: "Enter some text here",
  margin: "normal",
  required: false,
  size: "medium",
  variant: "outlined"
};

/**
 * Story for the TextField component with a masked input
 */
export const TextFieldWithInputProps = TemplateWithInputProps.bind({});
TextFieldWithInputProps.args = {
  disabled: false,
  helperText: "e.g. 225/60R16",
  label: "Enter some text here",
  margin: "normal",
  required: false,
  size: "medium",
  variant: "outlined"
};
