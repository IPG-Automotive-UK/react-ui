import { Autocomplete, Box, TextField } from "@mui/material";
import {
  isAutocompleteInput,
  isBooleanInput,
  isCheckboxInput,
  isFileUploaderInput,
  isNumberInput,
  isRadioInput,
  isTextInput
} from "./typechecks";

import Checkbox from "../../Checkbox";
import FileUploader from "../../FileUploader";
import RadioButtons from "../../RadioButtons";
import React from "react";
import SwitchField from "../../SwitchField";
import { ValidatedInputProps } from "./ValidatedInput.types";
import { useField } from "@conform-to/react";

/**
 * Component for displaying appropriate inputs based on the props
 */
const ValidatedInput = (props: ValidatedInputProps) => {
  // Provides the meta data from the form context for the input field
  const [meta] = useField(props.name);

  // If props are for a text input field, return a text input field
  if (isTextInput(props)) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <TextField
          error={!!meta.errors}
          helperText={meta.errors && meta.errors[0]}
          name={meta.name}
          label={props.label}
          required={props.required}
          size="small"
        />
      </Box>
    );
  }

  // If props are for a number input field, return a number input field
  if (isNumberInput(props)) {
    // Getting input props to do a transform on the default value
    const inputProps = { defaultValue: 0 };
    // Transform the default value to an empty string if it is 0
    const defaultValue =
      inputProps.defaultValue === 0 ? "" : inputProps.defaultValue;

    // render the number input field
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <TextField
          type="number"
          error={!!meta.errors}
          helperText={meta.errors && meta.errors[0]}
          name={meta.name}
          label={props.label}
          required={props.required}
          size="small"
          {...inputProps}
          defaultValue={defaultValue}
        />
      </Box>
    );
  }

  // If props are for an autocomplete input field, return an autocomplete input field
  if (isAutocompleteInput(props)) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Autocomplete
          options={props.options}
          // onChange={(e, value: string) => {
          //   props.handleAutocompleteChange(e, value, meta.name);
          // }}
          defaultValue={meta.initialValue || undefined}
          renderInput={params => (
            <TextField
              {...params}
              error={!!meta.errors}
              helperText={meta.errors && meta.errors[0]}
              required={props.required}
              name={meta.name}
              label={props.label}
              size="small"
            />
          )}
        />
      </Box>
    );
  }

  // If props are for a switch input field, return a switch input field
  if (isBooleanInput(props)) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <SwitchField
          helperText={meta.errors && meta.errors[0]}
          label={props.label}
          size="small"
          defaultChecked={meta.initialValue}
          options={props.options}
        />
      </Box>
    );
  }

  // If props are for a checkbox input field, return a checkbox input field
  if (isCheckboxInput(props)) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Checkbox
          disabled={props.disabled}
          label={props.label}
          size="small"
          defaultChecked={meta.initialValue}
        />
      </Box>
    );
  }

  // If props are for radio buttons, return a radio buttons component
  if (isRadioInput(props)) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <RadioButtons
          {...props}
          name={meta.name}
          title={props.label}
          options={props.options}
          size="small"
          defaultValue={meta.initialValue}
        />
      </Box>
    );
  }

  // If props are for a file uploader input field, return a file uploader input field
  if (isFileUploaderInput(props)) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <FileUploader
          {...props}
          // name={meta.name}
          title={props.label}
          required={props.required}
        />
      </Box>
    );
  }
  // If data is null or data type is unhandled, return null
  else {
    return null;
  }
};

export default ValidatedInput;
