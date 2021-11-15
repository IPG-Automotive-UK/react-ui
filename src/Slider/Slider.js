import { Box, Slider as MuiSlider, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

/**
 * Discrete slider component
 */
export default function Slider({
  labelPosition = "bottom",
  labels = [],
  max = 10,
  min = 1,
  onChange = () => {},
  onChangeCommitted = () => {},
  orientation = "horizontal",
  showLabels = true,
  step = 1,
  title,
  value,
  valueLabelDisplay = "auto"
}) {
  // get ticks labels if they are not pre defined
  const range = (start, stop, step) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step
    );
  // show/hide labels
  let marks = [];
  let stepSize = step;
  if (showLabels) {
    if (!labels.length) {
      range(min, max, stepSize).map(item => {
        const thisMark = { label: String(item), value: item };
        marks.push(thisMark);
      });
    } else {
      marks = labels;
      stepSize = null;
    }
  } else {
    marks = false;
  }
  // return components
  return (
    <Box>
      <Typography>{title}</Typography>
      <MuiSlider
        sx={{
          "& .MuiSlider-markLabel": {
            position: "absolute",
            top: labelPosition === "top" ? "-20px" : "30px"
          },
          marginTop: labelPosition === "top" ? "20px" : "5px"
        }}
        valueLabelDisplay={valueLabelDisplay}
        step={stepSize}
        marks={marks}
        min={min}
        max={max}
        onChange={onChange}
        onChangeCommitted={onChangeCommitted}
        value={typeof value !== "undefined" ? value : null}
        orientation={orientation}
      />
    </Box>
  );
}

Slider.propTypes = {
  /**
   * Tick label position respective to slide
   */
  labelPosition: PropTypes.oneOf(["bottom", "top"]),
  /**
   * Indicates predeterminated values to which the user can move the slider.
   * It should contain objects with "value" and optional "label" keys.
   */
  labels: PropTypes.array,
  /**
   * The maximum allowed value of the slider
   */
  max: PropTypes.number,
  /**
   * The minimum allowed value of the slider
   */
  min: PropTypes.number,
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
   * Callback fired when the value is changed.
   *
   * **Signature**
   * ```
   * function(event: object, value: number) => void
   * ```
   * _event_: The event source of the callback.
   * _value_: The new value.
   */
  onChangeCommitted: PropTypes.func,
  /**
   * Slider orientation
   */
  orientation: PropTypes.oneOf(["horizontal", "vertical"]),
  /**
   * If true, tick labels should be displayed
   */
  showLabels: PropTypes.bool,
  /**
   * The step of slider
   */
  step: PropTypes.number,
  /**
   * Slider title
   */
  title: PropTypes.string,
  /**
   * The input value
   */
  value: PropTypes.number,
  /**
   * If auto the value label will display when the thumb is hovered;
   * if on, will diplay persistently and if off will never display
   */
  valueLabelDisplay: PropTypes.oneOf(["auto", "off", "on"])
};
