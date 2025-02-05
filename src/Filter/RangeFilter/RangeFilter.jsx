import * as React from "react";

import { Box, InputLabel, Slider } from "@mui/material";

import PropTypes from "prop-types";

/**
 * A range filter allows to filter between two values.
 */
export default function RangeFilter({
  label,
  min = 0,
  max = 100,
  value = [min, max],
  unit = "%",
  onChange
}) {
  // state to track the value of the slider without committing it to the controller
  const [sliderValue, setSliderValue] = React.useState(value);
  React.useEffect(() => {
    setSliderValue(value);
  }, [value]);

  // callback for slider change
  const handleChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  // callback for slider change committed
  const handleChangeCommitted = (event, newValue) => {
    setSliderValue(newValue);
    onChange(newValue);
  };

  // generate marks
  const marks = [min, max].map(value => ({
    label: unit ? `${value} ${unit}` : value,
    value
  }));

  // return component
  return (
    <Box
      sx={{
        mb: -0.5,
        px: 2
      }}
    >
      <InputLabel
        sx={{
          mb: -1,
          ml: -2
        }}
        shrink
      >
        {label}
      </InputLabel>
      <Slider
        marks={marks}
        min={min}
        max={max}
        value={sliderValue}
        onChange={handleChange}
        onChangeCommitted={handleChangeCommitted}
        valueLabelDisplay="auto"
      />
    </Box>
  );
}

// prop types
RangeFilter.propTypes = {
  /**
   * The label of the filter.
   */
  label: PropTypes.string,
  /**
   * The maximum value.
   */
  max: PropTypes.number,
  /**
   * The minimum value.
   */
  min: PropTypes.number,
  /**
   * Callback function to handle changes
   * @param {Array} value - The new value
   * @returns {void}
   */
  onChange: PropTypes.func,
  /**
   * The value units.
   */
  unit: PropTypes.string,
  /**
   * The selected value
   */
  value: PropTypes.arrayOf(PropTypes.number)
};
