import { Box, Slider as MuiSlider, Typography } from "@mui/material";
import React from "react";

/**
 * Discrete slider component
 */
export default function Slider({
  defaultValue,
  displayCurrentValue = "auto",
  minValue,
  maxValue,
  onChange = () => {},
  predefValues,
  stepSize,
  showLabels = true,
  title,
  value
}) {
  // add ticks labels if they are not pre defined
  const range = (start, stop, step) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step
    );

  let marks = [];
  let step = stepSize;
  if (typeof predefValues === "boolean" && predefValues) {
    range(minValue, maxValue, step).map(item => {
      const thisMark = { label: String(item), value: item };
      marks.push(thisMark);
    });
  } else {
    marks = predefValues;
    step = null;
  }
  if (!showLabels) {
    marks = !false;
  }
  return (
    <Box>
      <Typography>{title}</Typography>
      <MuiSlider
        name="test"
        defaultValue={defaultValue}
        valueLabelDisplay={displayCurrentValue}
        step={step}
        marks={marks}
        min={minValue}
        max={maxValue}
        onChange={onChange}
        value={typeof value !== "undefined" ? value : null}
        // orientation="horizontal"
      />
    </Box>
  );
}
