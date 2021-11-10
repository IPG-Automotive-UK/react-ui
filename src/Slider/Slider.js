import { Box, Slider as MuiSlider, Typography } from "@mui/material";
import React from "react";

// const marks = [
//   {
//     label: "Start",
//     value: 0
//   },
//   {
//     label: "Step 1",
//     value: 1
//   },
//   {
//     label: "Step 2",
//     value: 2
//   },
//   {
//     label: "Step 3",
//     value: 3
//   },
//   {
//     label: "Step 4",
//     value: 4
//   },
//   {
//     label: "Step 5",
//     value: 5
//   }
// ];

/**
 * Discrete slider component
 */
export default function Slider({
  defaultValue,
  displayCurrentValue = "auto",
  minValue,
  maxValue,
  onChange = () => {},
  stepSize,
  predefValues,
  title,
  value
}) {
  return (
    <Box sx={{ padding: "20px", width: "30%" }}>
      <Typography>{title}</Typography>
      <MuiSlider
        defaultValue={defaultValue}
        valueLabelDisplay={displayCurrentValue}
        step={stepSize}
        marks={predefValues}
        min={minValue}
        max={maxValue}
        onChange={onChange}
        value={value}
        // orientation="horizontal"
      />
    </Box>
  );
}
