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

function calculateOptionWidth(option: string) {
  // Create a hidden DOM element to measure the option's width
  const dummyOption = document.createElement("div");
  dummyOption.style.display = "inline-block";
  dummyOption.style.visibility = "hidden";
  dummyOption.textContent = option;
  document.body.appendChild(dummyOption);
  const optionWidth = dummyOption.offsetWidth;
  document.body.removeChild(dummyOption);
  return optionWidth;
}

export default function Autocomplete({
  value = [],
  label,
  onChange = () => null,
  multiple = false,
  options
}: AutocompleteProps) {
  console.log("value", value);
  const inputRef = useRef<HTMLDivElement>(null);

  // define local state for limitTags
  const [limitTags, setLimitTags] = useState(0);

  const calculateLimitTags = React.useCallback(() => {
    if (inputRef.current) {
      if (Array.isArray(value) && value.length > 0) {
        const inputStyles = window.getComputedStyle(inputRef.current);
        const inputWidth = parseFloat(inputStyles.width);
        const optionWidths = value.map(option => calculateOptionWidth(option));
        const totalOptionWidth = optionWidths.reduce(
          (sum, width) => sum + width,
          0
        );

        // Calculate the maximum number of visible options
        const maxOptions = Math.floor((inputWidth - totalOptionWidth) / 62);

        setLimitTags(maxOptions);
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
