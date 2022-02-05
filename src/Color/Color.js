import { Box, Button, Popover, TextField } from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
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
  disabled = false,
  popoverWidth = "250px",
  showControls = true,
  showPicker = true,
  swatchSize = "small",
  value = "rgba(255,0,0,1)",
  anchorType = "anchorEl",
  onChange = () => {},
  onClose = () => {},
  ...props
}) {
  // create popover states
  const buttonRef = useRef(null);
  const [open, setOpen] = useState(props.open || false);

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

  // convert rgba string to swatch background color
  const swatchBackground = useMemo(() => {
    return color === ""
      ? "linear-gradient(to top left, rgba(255,0,0,0) 0%, rgba(255,0,0,0) calc(50% - 0.8px),rgba(255,0,0,1) 50%,rgba(255,0,0,0) calc(50% + 0.8px),rgba(0,0,0,0) 100% )"
      : color;
  }, [color]);

  // handle button / swatch size
  const swatchDimensions = useMemo(() => {
    switch (swatchSize) {
      case "small":
        return "15";
      case "medium":
        return "20";
      case "large":
        return "30";
      default:
        return "15";
    }
  }, [swatchSize]);

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

  // handle popover open
  const handleClick = () => {
    setOpen(true);
  };

  // handle popover close
  const handleClose = () => {
    onClose(color);
    setOpen(false);
  };

  // define components
  return (
    <Box>
      <Button
        sx={
          (sx.swatch,
          {
            "&:hover": {
              backgroundColor: color !== "" ? color : "transparent"
            },
            background: swatchBackground,
            height: `${swatchDimensions}px`,
            minHeight: `${swatchDimensions}px`,
            minWidth: `${swatchDimensions}px`,
            padding: "0",
            width: `${swatchDimensions}px`
          })
        }
        onClick={handleClick}
        id="swatch"
        data-testid="swatch"
        ref={buttonRef}
        variant="contained"
        disabled={disabled}
      />
      <Popover
        data-testid="popover"
        open={open}
        anchorEl={buttonRef.current}
        onClose={handleClose}
        anchorOrigin={{
          horizontal: props.anchorOriginHorizontal || "right",
          vertical: props.anchorOriginVertical || "bottom"
        }}
        transformOrigin={{
          horizontal: props.transformOriginHorizontal || "right",
          vertical: props.transformOriginVertical || "top"
        }}
        anchorPosition={{
          left: props.popoverPositionLeft || 0,
          top: props.popoverPositionTop || 0
        }}
        anchorReference={
          anchorType === "anchorEl" && !buttonRef.current ? "none" : anchorType
        }
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ m: 1, width: popoverWidth }}>
            {showPicker && (
              <Box sx={{ width: popoverWidth }}>
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
            <Box sx={{ width: "110px" }}>
              <Checkbox
                checked={noColorChecked}
                id="NoColorCheckbox"
                label="No Color"
                onChange={handleNoColor}
                size="small"
              />
            </Box>
            {showControls && (
              <div>
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
      </Popover>
    </Box>
  );
}

Color.propTypes = {
  /**
   * This is the point on the anchor where the popover's
   * `anchorEl` will attach to. This is not used when the
   * anchorReference is 'anchorPosition'.
   *
   * Options:
   * left, center, right.
   * @default : 'right'
   */
  anchorOriginHorizontal: PropTypes.oneOfType([
    PropTypes.oneOf(["center", "left", "right"]),
    PropTypes.number
  ]),
  /**
   * This is the point on the anchor where the popover's
   * `anchorEl` will attach to. This is not used when the
   * anchorReference is 'anchorPosition'.
   *
   * Options:
   * top, center, bottom
   * @default 'bottom'
   */
  anchorOriginVertical: PropTypes.oneOfType([
    PropTypes.oneOf(["bottom", "center", "top"]),
    PropTypes.number
  ]),
  /**
   * This determines which anchor prop to refer to when
   * setting the position of the popover.
   * @default 'anchorEl'
   */
  anchorType: PropTypes.oneOf(["anchorEl", "anchorPosition", "none"]),
  /**
   * This determines if the color picker is enabled or disabled.
   * @default 'false'
   */
  disabled: PropTypes.bool,
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
   * Callback fired when the popover is closed.
   *
   * **Signature**
   * ```
   * function(color: string) => void
   * ```
   * color: This is the selected colour in a rgba string e.g "rgba(255,0,0,1)".
   */
  onClose: PropTypes.func,
  /**
   * This determines if the popover is open on the intial
   * render.
   * @default false
   */
  open: PropTypes.bool,
  /**
   * This is the left positon of the popover when the anchor
   * type is anchorPosition.
   * @default 0
   */
  popoverPositionLeft: PropTypes.number,
  /**
   * This is the top positon of the popover when the anchor
   * type is anchorPosition.
   * @default 0
   */
  popoverPositionTop: PropTypes.number,
  /**
   * This is the width of the popover, this also effects the
   * popover's children the colorpicker and controls.
   * @default 250px
   */
  popoverWidth: PropTypes.string,
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
   * This determines the size of the swatch
   * Options:
   * small, medium, large
   * @default 'small'
   */
  swatchSize: PropTypes.oneOf(["small", "medium", "large"]),
  /**
   * This is the point on the popover which
   * will attach to the anchor's origin.
   *
   * Options:
   * left, center, right, x(px).
   * @default 'right'
   */
  transformOriginHorizontal: PropTypes.oneOfType([
    PropTypes.oneOf(["center", "left", "right"]),
    PropTypes.number
  ]),
  /**
   * This is the point on the popover which
   * will attach to the anchor's origin.
   *
   * Options:
   * top, center, bottom, x(px);
   * @default "top"
   */
  transformOriginVertical: PropTypes.oneOfType([
    PropTypes.oneOf(["bottom", "center", "top"]),
    PropTypes.number
  ]),
  /**
   * This is the rgba color string that is used to
   * set the inital value
   * @default "rgba(255,0,0,1)"
   */
  value: PropTypes.string
};
