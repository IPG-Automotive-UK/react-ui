import { Box, Slider as MuiSlider, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

/**
 * Discrete slider component
 */
export default function Slider({
  color = "primary",
  disabled = false,
  labelStyle = {},
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

  // count decimal places in a number
  function countDecimals(value) {
    return value % 1 ? value.toString().split(".")[1].length : 0;
  }

  // show/hide labels
  let marks = [];
  let stepSize = step;
  if (showLabels) {
    if (!labels.length && step !== 0) {
      range(min, max, stepSize).map(item => {
        const thisMark = {
          label: String(item.toFixed(countDecimals(step))),
          value: item
        };
        marks.push(thisMark);
      });
    } else {
      marks = labels;
      stepSize = null;
    }
  } else {
    marks = false;
  }
  // set label position based on orientation
  let style = {};
  if (orientation === "horizontal") {
    style = {
      position: "absolute",
      top: labelPosition === "top" ? "-20px" : "30px"
    };
  } else {
    style = {
      left: labelPosition === "left" ? "-15px" : "30px",
      position: "absolute"
    };
  }
  // return components
  return (
    <Box sx={{ height: "100%" }}>
      <Typography>{title}</Typography>
      <Box sx={{ height: "100%" }}>
        <MuiSlider
          sx={{
            "& .MuiSlider-markLabel": {
              ...labelStyle,
              ...style
            },
            '& input[type="range"]': {
              WebkitAppearance: `slider-${orientation}`
            },
            color: { color },
            marginTop:
              orientation === "horizontal" && labelPosition === "top"
                ? "20px"
                : "5px"
          }}
          disabled={disabled}
          marks={marks}
          max={max}
          min={min}
          onChange={onChange}
          onChangeCommitted={onChangeCommitted}
          orientation={orientation}
          step={stepSize}
          value={typeof value !== "undefined" ? value : null}
          valueLabelDisplay={valueLabelDisplay}
        />
      </Box>
    </Box>
  );
}

Slider.propTypes = {
  /**
   * The color of the component
   */
  color: PropTypes.string,
  /**
   * If true, the label, input and helper text should be displayed in a disabled state.
   */
  disabled: PropTypes.bool,
  /**
   * Tick label position respective to slide
   */
  labelPosition: PropTypes.oneOf(["bottom", "top", "left", "right"]),
  /**
   * Custom style to apply to the labels
   */
  labelStyle: PropTypes.object,
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
