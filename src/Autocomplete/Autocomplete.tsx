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
  value = [],
  label,
  onChange = () => null,
  multiple = false,
  options
}: AutocompleteProps) {
  const inputRef = useRef<HTMLDivElement>(null);

  // define local state for limitTags
  const [limitTags, setLimitTags] = useState(-1);

  const calculateLimitTags = React.useCallback(() => {
    if (inputRef.current) {
      const inputStyles = window.getComputedStyle(inputRef.current);
      const inputWidth = parseFloat(inputStyles.width);

      // total width of the selected options
      let totalOptionWidth = 0;

      // length of the selected options
      let length = 0;

      // const spacing between the selected options
      const spacing = 9;

      // loop through the selected options
      inputRef.current.childNodes[1].childNodes.forEach(child => {
        if (
          child instanceof HTMLElement &&
          child.classList.contains("MuiChip-root")
        ) {
          totalOptionWidth += child.offsetWidth + spacing;
          length++;
        }
      });

      // if the total width of the selected options is greater than the input width then set the limitTags
      if (totalOptionWidth > inputWidth) {
        // add 1 to the length to account for the input
        let sum = 0;
        sum++;

        // calculate the limitTags
        const limitTags = length - sum;

        // set the limitTags
        setLimitTags(limitTags);
      } else {
        // if the total width of the selected options is less than the input width then set the limitTags to -1
        setLimitTags(-1);
      }
    }
  }, [inputRef]);

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
        <TextField {...params} label={label} ref={inputRef} />
      )}
      renderOption={multiple ? Option : undefined}
      value={value}
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
