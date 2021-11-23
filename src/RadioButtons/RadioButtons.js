import * as React from "react";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import PropTypes from "prop-types";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

/**
 * Radio buttons group component
 */
export default function RadioButtons({
  disabled = false,
  labelPlacement = "end",
  onChange = () => {},
  options = [],
  radioGroupStyle = {},
  row = false,
  size = "medium",
  title = "",
  value
}) {
  return (
    <FormControl disabled={disabled} component="fieldset">
      <FormLabel component="legend">{title}</FormLabel>
      <RadioGroup
        sx={radioGroupStyle}
        aria-label={title}
        onChange={onChange}
        row={row}
        value={value}
      >
        {options.map((item, index) => (
          <FormControlLabel
            key={index}
            control={<Radio size={size} />}
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
   * The default value
   */
  defaultValue: PropTypes.string,
  /**
   * If true, the radio buttons group will be disabled
   */
  disabled: PropTypes.bool,
  /**
   * The position of the label
   */
  labelPlacement: PropTypes.oneOf(["start", "end", "top", "bottom"]),
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
   * The lables of the radio buttons group
   */
  options: PropTypes.arrayOf(PropTypes.string),
  /**
   * Custom style to apply to the radio buttons group
   */
  radioGroupStyle: PropTypes.object,
  /**
   * The layout of the buttons
   */
  row: PropTypes.bool,
  /**
   * The size of the radio button
   */
  size: PropTypes.oneOf(["small", "medium"]),
  /**
   * The title of the radio buttons group
   */
  title: PropTypes.string,
  /**
   * Value of selected radion button
   */
  value: PropTypes.string
};
