import { Box, TextField } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";

import Checkbox from "../Checkbox/Checkbox";
import PropTypes from "prop-types";
import { RgbaColorPicker } from "react-colorful";
import { colord } from "colord";
import { useDebouncyFn } from "use-debouncy";

// styling
const sx = {
  colorPicker: {
    "& .react-colorful": {
      height: "240px",
      width: "100%"
    },
    "& .react-colorful__alpha": {
      borderRadius: "1 0 0 0"
    },
    "& .react-colorful__alpha-pointer": {
      borderRadius: "4 4 0 0",
      height: "15px",
      width: "15px"
    },
    "& .react-colorful__hue-pointer": {
      borderRadius: "4 4 0 0",
      height: "15px",
      width: "15px"
    },
    "& .react-colorful__last-control": {
      borderRadius: "0 0 0 0"
    },
    "& .react-colorful__saturation": {
      borderRadius: "0  0 0"
    },
    "& .react-colorful__saturation-pointer": {
      borderRadius: "4 4 0 0",
      height: "15px",
      width: "15px"
    }
  }
};

// component to select a color
export default function Color({
  onChange = () => {},
  showControls = true,
  showPicker = true,
  value = "rgba(255,0,0,1)"
}) {
  // color state
  const [color, setColor] = useState(value);

  // store last value to return back to it when toggling no color
  const [lastColor, setLastColor] = useState(value);
  useEffect(() => {
    if (color.length !== 0) {
      setLastColor(color);
    }
  }, [color]);

  // call on change when color changes
  useEffect(() => {
    onChange(color);
  }, [color]);

  // convert rgba string to rgba object
  const rgbaObj = useMemo(() => {
    return colord(color).toRgb();
  }, [color]);

  // check if no color is selected
  const noColorChecked = useMemo(() => {
    return color.length === 0;
  }, [color]);

  // debounce color picker change
  const handleColorPickerChange = useDebouncyFn(newRbgaObj => {
    const newColor = colord(newRbgaObj).toRgbString();
    setColor(newColor);
  }, 200);

  // handle no color button click
  const handleNoColor = event => {
    // return empty string if no value is checked otherwise return last value
    const newColor = event.target.checked
      ? ""
      : lastColor.length === 0
      ? "rgba(255,0,0,1)" // if there was no last value then return default
      : lastColor;
    setColor(newColor);
  };

  // handle red change
  const handleRedChange = event => {
    const newColor = colord({
      ...rgbaObj,
      r: event.target.value
    }).toRgbString();
    setColor(newColor);
  };

  // handle green change
  const handleGreenChange = event => {
    const newColor = colord({
      ...rgbaObj,
      g: event.target.value
    }).toRgbString();
    setColor(newColor);
  };

  // handle Blue change
  const handleBlueChange = event => {
    const newColor = colord({
      ...rgbaObj,
      b: event.target.value
    }).toRgbString();
    setColor(newColor);
  };

  // handle alpha change
  const handleAlphaChange = event => {
    const newColor = colord({
      ...rgbaObj,
      a: event.target.value
    }).toRgbString();
    setColor(newColor);
  };

  // define components
  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box>
          {showPicker && (
            <Box>
              <Box sx={sx.colorPicker}>
                {noColorChecked ? (
                  <Box
                    sx={{
                      border: "1px solid #bdbdbd",
                      borderRadius: "4px",
                      height: "238px"
                    }}
                  />
                ) : (
                  <RgbaColorPicker
                    color={rgbaObj}
                    onChange={handleColorPickerChange}
                    id="colorPicker"
                  />
                )}
              </Box>
            </Box>
          )}
          {showControls && (
            <div>
              <Checkbox
                checked={noColorChecked}
                id="NoColorCheckbox"
                label="No Color"
                onChange={handleNoColor}
                size="small"
              />
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <TextField
                  data-testid="redTextField"
                  disabled={noColorChecked}
                  id="red"
                  type="number"
                  size="small"
                  margin="dense"
                  max="255"
                  label="Red"
                  error={rgbaObj.r > 255}
                  value={noColorChecked ? "" : rgbaObj.r}
                  sx={{
                    marginRight: theme => theme.spacing(1),
                    width: "33%"
                  }}
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={handleRedChange}
                  inputProps={{ max: 255, min: 0 }}
                />
                <TextField
                  data-testid="greenTextField"
                  disabled={noColorChecked}
                  id="green"
                  type="number"
                  size="small"
                  margin="dense"
                  max="255"
                  label="Green"
                  error={rgbaObj.g > 255}
                  value={noColorChecked ? "" : rgbaObj.g}
                  sx={{
                    marginRight: theme => theme.spacing(1),
                    width: "33%"
                  }}
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={handleGreenChange}
                  inputProps={{ max: 255, min: 0 }}
                />
                <TextField
                  data-testid="blueTextField"
                  disabled={noColorChecked}
                  id="blue"
                  type="number"
                  size="small"
                  margin="dense"
                  max="255"
                  label="Blue"
                  error={rgbaObj.b > 255}
                  value={noColorChecked ? "" : rgbaObj.b}
                  sx={{ width: "33%" }}
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={handleBlueChange}
                  inputProps={{ max: 255, min: 0 }}
                />
              </Box>
              <TextField
                data-testid="alphaTextField"
                disabled={noColorChecked}
                id="alpha"
                type="number"
                size="small"
                margin="dense"
                max="1"
                label="Transparency"
                error={rgbaObj.a > 1}
                value={noColorChecked ? "" : rgbaObj.a}
                fullWidth
                InputLabelProps={{
                  shrink: true
                }}
                onChange={handleAlphaChange}
                inputProps={{ max: 1, min: 0, step: 0.1 }}
              />
            </div>
          )}
        </Box>
      </Box>
    </Box>
  );
}

Color.propTypes = {
  /**
   * Callback fired when the value is changed.
   *
   * **Signature**
   * ```
   * function(color: string) => void
   * ```
   * color: This is the selected colour in a rgba string e.g "rgba(255,0,0,1)".
   */
  onChange: PropTypes.func,
  /**
   * This determines if the RGB and HEX controls are shown.
   * @default true
   */
  showControls: PropTypes.bool,
  /**
   * This determines if the colorpicker is shown.
   * @default true
   */
  showPicker: PropTypes.bool,
  /**
   * This is the rgba color string that is used to
   * set the inital value
   * @default "rgba(255,0,0,1)"
   */
  value: PropTypes.string
};
