import {
  InputType,
  ValidatedAutocompleteProps,
  ValidatedCheckboxProps,
  ValidatedFileUploaderProps,
  ValidatedInputProps,
  ValidatedRadioButtonsProps,
  ValidatedSwitchFieldProps,
  ValidatedTextFieldProps
} from "./ValidatedInput.types";

/**
 * Validates if the input is an autocomplete input
 * @param props ValidatedInputProps
 * @returns Correct type of input
 */
export function isAutocompleteInput(
  props: ValidatedInputProps
): props is ValidatedAutocompleteProps {
  return props.kind === InputType.SELECT;
}

/**
 * Validates if the input is a switch input
 * @param props ValidatedInputProps
 * @returns Correct type of input
 */
export function isBooleanInput(
  props: ValidatedInputProps
): props is ValidatedSwitchFieldProps {
  return props.kind === InputType.SWITCH;
}

/**
 * Validates if the input is a checkbox input
 * @param props ValidatedInputProps
 * @returns Correct type of input
 */
export function isCheckboxInput(
  props: ValidatedInputProps
): props is ValidatedCheckboxProps {
  return props.kind === InputType.CHECKBOX;
}

/**
 * Validates if the input is a number input
 * @param props ValidatedInputProps
 * @returns Correct type of input
 */
export function isNumberInput(
  props: ValidatedInputProps
): props is ValidatedTextFieldProps {
  return props.kind === InputType.NUMBER;
}

/**
 * Validates if the input is a text input
 * @param props ValidatedInputProps
 * @returns Correct type of input
 */
export function isTextInput(
  props: ValidatedInputProps
): props is ValidatedTextFieldProps {
  return props.kind === InputType.TEXT;
}

/**
 * Validates if the input is a radio input
 * @param props ValidatedInputProps
 * @returns Correct type of input
 */
export function isRadioInput(
  props: ValidatedInputProps
): props is ValidatedRadioButtonsProps {
  return props.kind === InputType.RADIO;
}

/**
 * Validates if the input is a file uploader input
 * @param props ValidatedInputProps
 * @returns Correct type of input
 */
export function isFileUploaderInput(
  props: ValidatedInputProps
): props is ValidatedFileUploaderProps {
  return props.kind === InputType.FILE_UPLOADER;
}
