import {
  AutocompleteProps,
  CheckboxProps,
  FileUploaderProps,
  RadioButtonsProps,
  SwitchFieldProps,
  TextFieldProps
} from "../../";

import { SyntheticEvent } from "react";

/**
 * Input types
 */
export enum InputType {
  BOOLEAN = "boolean",
  CHECKBOX = "checkbox",
  NUMBER = "number",
  RADIO = "radio",
  SELECT = "select",
  TEXT = "text",
  FILE_UPLOADER = "file-uploader"
}

/**
 * Associated vehicle type
 */
export type ValidatedInputAttributeData = {
  label: string;
  kind: InputType;
  name: string;
};

/**
 *  Props for the AutocompleteInput component
 *  The handle autocomplete change is specified as Autocomplete is a special case for input handling
 *  @param handleAutocompleteChange - function to call when the input changes
 */
export type ValidatedAutocompleteProps = ValidatedInputAttributeData &
  AutocompleteProps<string, boolean> & {
    handleAutocompleteChange: (
      e: SyntheticEvent,
      value: string,
      name: string
    ) => void;
  };

/**
 * Prop type for text fields
 */
export type ValidatedTextFieldProps = ValidatedInputAttributeData &
  TextFieldProps;

/**
 * Prop type for checkboxes
 */
export type ValidatedCheckboxProps = ValidatedInputAttributeData &
  CheckboxProps;

/**
 * Prop type for radio buttons
 */
export type ValidatedRadioButtonsProps = ValidatedInputAttributeData &
  RadioButtonsProps;

/**
 * Prop type for switch fields
 */
export type ValidatedSwitchFieldProps = ValidatedInputAttributeData &
  SwitchFieldProps;

/**
 * Prop type for file uploaders
 */
export type ValidatedFileUploaderProps = ValidatedInputAttributeData &
  FileUploaderProps;

/**
 * Union props type for the ValidatedInput component
 */
export type ValidatedInputProps =
  | ValidatedTextFieldProps
  | ValidatedAutocompleteProps
  | ValidatedCheckboxProps
  | ValidatedRadioButtonsProps
  | ValidatedSwitchFieldProps
  | ValidatedFileUploaderProps;
