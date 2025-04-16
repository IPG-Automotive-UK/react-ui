import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { Chip, alpha, chipClasses, useTheme } from "@mui/material";

import { DifferenceChipProps } from "./DifferenceChip.types";
import React from "react";

/**
 * This component is based on the material Chip. Added functionality to show a difference value with an icon.
 * It shows a positive value with an ArrowDropUp icon and a negative value with an ArrowDropDown icon.
 * It also supports showing a unit with the value.
 */
function DifferenceChip({ value, unit = "" }: DifferenceChipProps) {
  // get theme from context
  const theme = useTheme();

  // check if the value is positive
  const isPositive = value >= 0;

  // set the color and border color based on the value
  const chipBorderColor = isPositive
    ? theme.palette.success.dark
    : theme.palette.error.main;

  const chipColor = isPositive
    ? theme.palette.success.main
    : theme.palette.error.main;

  // format the value with the unit if provided and remove the sign if positive / negative
  const formattedValue = `${Math.abs(value)}${unit}`;

  // render the chip with the value and icon
  return (
    <Chip
      icon={isPositive ? <ArrowDropUp /> : <ArrowDropDown />}
      label={formattedValue}
      variant="filled"
      sx={{
        [`& .${chipClasses.icon}`]: {
          color: chipColor,
          height: 12,
          m: "0",
          width: 12
        },
        [`& .${chipClasses.label}`]: {
          color: chipColor,
          fontSize: "10px",
          fontWeight: 600,
          p: "0"
        },
        backgroundColor: alpha(chipColor, 0.12),
        border: `0.3px solid ${chipBorderColor}`,
        borderRadius: "100px",
        gap: "2px",
        height: 18,
        justifyContent: "center",
        px: "6px",
        py: "0.5px"
      }}
    />
  );
}

export default DifferenceChip;
