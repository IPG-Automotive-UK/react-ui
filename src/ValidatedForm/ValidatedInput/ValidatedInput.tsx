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
import { useField } from "remix-validated-form";

/**
 * Component for displaying appropriate inputs based on the props
 */
const ValidatedInput = (props: ValidatedInputProps) => {
  // Get data from the useField hook from remix validated form
  const { error, getInputProps, defaultValue } = useField(props.name, {
    validationBehavior: {
      whenTouched: "onSubmit"
    }
  });

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
          error={!!error || props.error}
          helperText={error}
          name={props.name}
          label={props.label}
          required={props.required}
          size="small"
          {...getInputProps()}
        />
      </Box>
    );
  }

  // If props are for a number input field, return a number input field
  if (isNumberInput(props)) {
    // Getting input props to do a transform on the default value
    const inputProps = getInputProps();
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
          error={!!error || props.error}
          helperText={error}
          name={props.name}
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
          {...getInputProps({
            onChange: (e, value: string) => {
              if (!error) {
                props.handleAutocompleteChange(e, value, props.name);
              }
            }
          })}
          defaultValue={defaultValue || undefined}
          renderInput={params => (
            <TextField
              {...params}
              error={!!error}
              helperText={error}
              required={props.required}
              name={props.name}
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
          helperText={error}
          label={props.label}
          size="small"
          defaultChecked={defaultValue}
          options={props.options}
          {...getInputProps()}
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
          defaultChecked={defaultValue}
          {...getInputProps()}
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
          name={props.name}
          title={props.label}
          options={props.options}
          size="small"
          defaultValue={defaultValue}
          {...getInputProps()}
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
          name={props.name}
          title={props.label}
          required={props.required}
          {...getInputProps()}
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
