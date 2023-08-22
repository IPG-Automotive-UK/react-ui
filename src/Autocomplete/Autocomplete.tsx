import * as React from "react";

import {
  Box,
  Checkbox,
  Autocomplete as MuiAutocomplete,
  TextField,
  Typography
} from "@mui/material";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";

import { AutocompleteProps } from "./Autocomplete.types";

export default function Autocomplete({
  value,
  label,
  onChange = () => null,
  multiple = false,
  options,
  disabled = false,
  size = "medium",
  error = false,
  helperText,
  margin = "normal",
  required = false,
  variant = "outlined"
}: AutocompleteProps) {
  const inputRef = useRef<HTMLDivElement>(null);

  // define local state for limitTags
  const [limitTags, setLimitTags] = useState(-1);

  const calculateLimitTags = React.useCallback(() => {
    if (inputRef.current) {
      if (Array.isArray(value) && value.length > 0) {
        const inputStyles = window.getComputedStyle(inputRef.current);
        const inputWidth = parseFloat(inputStyles.width);

        // total width of the selected options
        let totalOptionWidth = 0;

        // selected tags length
        let selectedTagsLength = 0;

        // available space for tags to fit
        let availableSpace = 0;

        // space between the tags
        const tagSpacing = 9;

        // loop through the selected options
        inputRef.current.childNodes[1].childNodes.forEach(child => {
          if (
            child instanceof HTMLElement &&
            child.classList.contains("MuiChip-root")
          ) {
            totalOptionWidth += child.offsetWidth + tagSpacing + 32;

            // Calculate the available space for tags
            availableSpace = inputWidth - totalOptionWidth;

            // selected tags length
            selectedTagsLength++;

            if (availableSpace >= child.offsetWidth + tagSpacing) {
              // All tags fit within the input, so no limit needed
              setLimitTags(-1);
            } else {
              // Calculate the limitTags based on available space
              let limitTags = 0;

              limitTags++;

              setLimitTags(selectedTagsLength - limitTags);
            }
          }
        });
      }
    }
  }, [inputRef, value]);

  useEffect(() => {
    if (multiple) {
      calculateLimitTags(); // Calculate initially

      // Add an event listener for window resize
      const handleResize = () => {
        calculateLimitTags(); // Recalculate on window resize
      };

      window.addEventListener("resize", handleResize);

      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
    return undefined;
  }, [multiple, calculateLimitTags]); // Run when selected options change

  return (
    <MuiAutocomplete
      limitTags={multiple ? limitTags : -1}
      multiple={multiple}
      onChange={(e, newValue) => onChange(newValue || [])}
      options={options}
      renderInput={params => (
        <TextField
          {...params}
          label={label}
          ref={inputRef}
          error={error}
          helperText={helperText}
          margin={margin}
          required={required}
          variant={variant}
        />
      )}
      renderOption={multiple ? Option : undefined}
      value={value}
      clearIcon={multiple ? null : undefined}
      disabled={disabled}
      size={size}
    />
  );
}

// renderer for a checkbox option
function Option(
  props: any,
  option: string,
  { selected }: { selected: boolean }
) {
  return (
    <Box component="li" {...props}>
      <Checkbox
        icon={<CheckBoxOutlineBlank fontSize="small" />}
        checkedIcon={<CheckBox fontSize="small" />}
        checked={selected}
        value={option}
      />
      <Typography>{option}</Typography>
    </Box>
  );
}
