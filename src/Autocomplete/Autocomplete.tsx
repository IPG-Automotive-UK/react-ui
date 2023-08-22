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

export default function Autocomplete<
  Value extends string,
  Multiple extends boolean | undefined
>({
  value,
  label,
  onChange,
  multiple = false,
  options,
  disabled = false,
  size = "medium",
  error = false,
  helperText,
  margin = "normal",
  required = false,
  variant = "outlined"
}: AutocompleteProps<Value, Multiple>) {
  const inputRef = useRef<HTMLDivElement>(null);

  // define local state for limitTags
  const [limitTags, setLimitTags] = useState(-1);

  const calculateLimitTags = React.useCallback(() => {
    if (inputRef.current) {
      if (Array.isArray(value) && value.length > 0) {
        const inputStyles = window.getComputedStyle(inputRef.current);
        const inputWidth = parseFloat(inputStyles.width);

        const tagWidths = Array.from(inputRef.current.childNodes[1].childNodes)
          .map(child => {
            if (!(child instanceof HTMLElement)) return NaN;
            if (!child.classList.contains("MuiChip-root")) return NaN;

            const styles = window.getComputedStyle(child);
            const marginLeft = parseFloat(styles.marginLeft);
            const marginRight = parseFloat(styles.marginRight);
            const width = parseFloat(styles.width);
            return marginLeft + marginRight + width;
          })
          .filter(x => !isNaN(x))
          .reduce((a, b) => [...a, a[a.length - 1] + b], []);

        console.log(tagWidths);
        const maxTags = tagWidths.filter(x => x < inputWidth).length;

        setLimitTags(maxTags === tagWidths.length ? -1 : maxTags);
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
      onChange={onChange}
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
