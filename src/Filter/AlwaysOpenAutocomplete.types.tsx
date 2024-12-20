import { AutocompleteProps } from "../Autocomplete";

// Configure the props for the AlwaysOpenAutocomplete component by setting appropriate generics to configure the base MUI Autocomplete component for our use case.
export type AlwaysOpenAutocompleteProps = AutocompleteProps<
  string, // this is the value of the options, which in our case is a string
  boolean, // this is the multiple value as we want to enable multiple selection
  boolean // this is the disable clearable value as we want to be able to control this
>;
