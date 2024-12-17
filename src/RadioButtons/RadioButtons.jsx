import * as React from "react";

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup
} from "@mui/material";

import PropTypes from "prop-types";

/**
 * Radio buttons group component
 */
export default function RadioButtons({
  defaultValue,
  disabled = false,
  labelPlacement = "end",
  name,
  onChange = () => {},
  options = [],
  style = {},
  row = false,
  size = "medium",
  title = "",
  value
}) {
  // return components
  return (
    <FormControl disabled={disabled} component="fieldset">
      <FormLabel component="legend" color={"textSecondary"}>
        {title}
      </FormLabel>
      <RadioGroup
        sx={style}
        aria-label={title}
        defaultValue={defaultValue}
        name={name}
        onChange={onChange}
        row={row}
        value={value}
      >
        {options.map((item, index) => (
          <FormControlLabel
            key={index}
            control={<Radio name={name} size={size} />}
            label={item}
            value={item}
            labelPlacement={labelPlacement}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

RadioButtons.propTypes = {
  /**
   * The default value of the radio buttons group.
   */
  defaultValue: PropTypes.string,
  /**
   * If true, the radio buttons group will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * The position of the label.
   */
  labelPlacement: PropTypes.oneOf(["start", "end", "top", "bottom"]),
  /**
   * The name of the radio buttons group and each radio.
   */
  name: PropTypes.string,
  /**
   * Callback fired when the radio button is selected.
   *
   * **Signature**
   * ```
   * function(event: object, value: string) => void
   * ```
   * _event_: The event source of the callback.
   * _value_: The value of the selected radio button You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: PropTypes.func,
  /**
   * The lables of the radio buttons group.
   */
  options: PropTypes.arrayOf(PropTypes.string),
  /**
   * If true the buttons will be displayed in a row otherwise in a column.
   */
  row: PropTypes.bool,
  /**
   * The size of the radio button.
   */
  size: PropTypes.oneOf(["small", "medium"]),
  /**
   * Custom style to apply to the radio buttons group.
   */
  style: PropTypes.object,
  /**
   * The title of the radio buttons group.
   */
  title: PropTypes.string,
  /**
   * Value of selected radio button.
   */
  value: PropTypes.string
};
