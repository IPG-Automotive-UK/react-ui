import {
  InputType,
  ValidatedAutocompleteProps,
  ValidatedCheckboxProps,
  ValidatedInputProps,
  ValidatedRadioButtonsProps,
  ValidatedSwitchFieldProps,
  ValidatedTextFieldProps
} from "./ValidatedInput.types";

/**
 * Validates if the input is an autocomplete input
 * @param metadata ValidatedInputProps
 * @returns Correct type of input
 */
export function isAutocompleteInput(
  metadata: ValidatedInputProps
): metadata is ValidatedAutocompleteProps {
  return metadata.kind === InputType.SELECT;
}

/**
 * Validates if the input is a boolean input
 * @param metadata ValidatedInputProps
 * @returns Correct type of input
 */
export function isBooleanInput(
  metadata: ValidatedInputProps
): metadata is ValidatedSwitchFieldProps {
  return metadata.kind === InputType.BOOLEAN;
}

/**
 * Validates if the input is a checkbox input
 * @param metadata ValidatedInputProps
 * @returns Correct type of input
 */
export function isCheckboxInput(
  metadata: ValidatedInputProps
): metadata is ValidatedCheckboxProps {
  return metadata.kind === InputType.CHECKBOX;
}

/**
 * Validates if the input is a number input
 * @param metadata ValidatedInputProps
 * @returns Correct type of input
 */
export function isNumberInput(
  metadata: ValidatedInputProps
): metadata is ValidatedTextFieldProps {
  return metadata.kind === InputType.NUMBER;
}

/**
 * Validates if the input is a text input
 * @param metadata ValidatedInputProps
 * @returns Correct type of input
 */
export function isTextInput(
  metadata: ValidatedInputProps
): metadata is ValidatedTextFieldProps {
  return metadata.kind === InputType.TEXT;
}

/**
 * Validates if the input is a radio input
 * @param metadata ValidatedInputProps
 * @returns Correct type of input
 */
export function isRadioInput(
  metadata: ValidatedInputProps
): metadata is ValidatedRadioButtonsProps {
  return metadata.kind === InputType.RADIO;
}
