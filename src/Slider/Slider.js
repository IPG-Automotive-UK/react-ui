import { Box, Slider as MuiSlider, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

/**
 * Discrete slider component
 */
export default function Slider({
  displayCurrentValue = "auto",
  maxValue,
  minValue,
  onChange = () => {},
  predefValues,
  showLabels = true,
  stepSize,
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
        valueLabelDisplay={displayCurrentValue}
        step={step}
        marks={marks}
        min={minValue}
        max={maxValue}
        onChange={onChange}
        value={typeof value !== "undefined" ? value : null}
        orientation="horizontal"
      />
    </Box>
  );
}

Slider.propTypes = {
  /**
   * If auto the value label will display when the thumb is hovered;
   * if on, will diplay persistently and if off will never display
   */
  displayCurrentValue: PropTypes.oneOf(["auto", "off", "on"]),
  /**
   * The maximum allowed value of the slider
   */
  maxValue: PropTypes.number,
  /**
   * The minimum allowed value of the slider
   */
  minValue: PropTypes.number,
  /**
   * Callback fired when the value is changed.
   *
   * **Signature**
   * ```
   * function(event: object, value: number) => void
   * ```
   * _event_: The event source of the callback. You can pull out the new value by accessing `event.target.value` (any).
   * _value_: The new value.
   */
  onChange: PropTypes.func,
  /**
   * Indicates predeterminated values to wich the user can move the slider.
   * It should contain objects with "value" and optional "label" keys.
   */
  predefValues: PropTypes.array,
  /**
   * If true, thicks' labels should be displayed
   */
  showLabels: PropTypes.bool,
  /**
   * The step of slider
   */
  stepSize: PropTypes.number,
  /**
   * Slide's title
   */
  title: PropTypes.string,
  /**
   * The input value
   */
  value: PropTypes.number
};
