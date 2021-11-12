import { Box, Slider as MuiSlider, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

/**
 * Discrete slider component
 */
export default function Slider({
  displayCurrentValue = "auto",
  max = 10,
  min = 1,
  onChange = () => {},
  onChangeComitted = () => {},
  orientation = "horizontal",
  predefValues = [],
  labels = true,
  labelPosition = "bottom",
  step = 1,
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
  let stepSize = step;
  if (labels) {
    if (!predefValues.length) {
      range(min, max, stepSize).map(item => {
        const thisMark = { label: String(item), value: item };
        marks.push(thisMark);
      });
    } else {
      marks = predefValues;
      stepSize = null;
    }
  } else {
    marks = false;
  }
  return (
    <Box>
      <Typography>{title}</Typography>
      {labelPosition === "top" ? (
        <MuiSlider
          sx={{
            "& .MuiSlider-markLabel": {
              position: "absolute",
              top: "-15px"
            },
            marginTop: "20px"
          }}
          valueLabelDisplay={displayCurrentValue}
          step={stepSize}
          marks={marks}
          min={min}
          max={max}
          onChange={onChange}
          onChangeComitted={onChangeComitted}
          value={typeof value !== "undefined" ? value : null}
          orientation={orientation}
        />
      ) : (
        <MuiSlider
          valueLabelDisplay={displayCurrentValue}
          step={stepSize}
          marks={marks}
          min={min}
          max={max}
          onChange={onChange}
          onChangeComitted={onChangeComitted}
          value={typeof value !== "undefined" ? value : null}
          orientation={orientation}
        />
      )}
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
   * Tick label position respective to slide
   */
  labelPosition: PropTypes.oneOf(["bottom", "top"]),
  /**
   * If true, thick labels should be displayed
   */
  labels: PropTypes.bool,
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
  onChangeComitted: PropTypes.func,
  /**
   * Slider orientation
   */
  orientation: PropTypes.oneOf(["horizontal", "vertical"]),

  /**
   * Indicates predeterminated values to wich the user can move the slider.
   * It should contain objects with "value" and optional "label" keys.
   */
  predefValues: PropTypes.array,
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
  value: PropTypes.number
};
