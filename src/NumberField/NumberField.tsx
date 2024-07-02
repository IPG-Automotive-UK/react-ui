import { InputAdornment, TextField } from "@mui/material";

import { NumberFieldProps } from "./NumberField.types";
import React from "react";

/**
 * Number fields let users enter and edit numbers.
 */
export default function NumberField(props: NumberFieldProps) {
  // Destructure custom props and create defaults different from the MUI TextField component
  // Spread the rest of the mui component props
  const {
    endAdornment,
    margin = "normal",
    startAdornment,
    stepper = true,
    variant = "outlined",
    ...rest
  } = props;

  // Return a MUI TextField component
  // Explicitly declare custom props and defaults
  // Spread the rest of the mui component props
  return (
    <TextField
      {...rest}
      margin={margin}
      variant={variant}
      InputLabelProps={{ shrink: true }}
      InputProps={{
        ...(endAdornment && {
          endAdornment: (
            <InputAdornment position="end">{endAdornment}</InputAdornment>
          )
        }),
        ...(startAdornment && {
          startAdornment: (
            <InputAdornment position="start">{startAdornment}</InputAdornment>
          )
        })
      }}
      sx={
        !stepper
          ? {
              "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                { display: "none" }
            }
          : {}
      }
      type="number"
    />
  );
}
