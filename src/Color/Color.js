import {
  Box,
  Button,
  InputAdornment,
  Popover,
  TextField,
  Typography
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { RgbaColorPicker } from "react-colorful";

// styling
const sx = {
  colorPicker: {
    "& .react-colorful": {
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
  },
  noColorSwatch: {
    background:
      "linear-gradient(to top left, rgba(255,0,0,0) 0%, rgba(255,0,0,0) calc(50% - 0.8px),rgba(255,0,0,1) 50%,rgba(255,0,0,0) calc(50% + 0.8px),rgba(0,0,0,0) 100% )",
    backgroundColor: "transparent",
    border: "1px solid #ccc",
    borderRadius: "4px",
    height: "20px",
    minHeight: "20px",
    minWidth: "20px",
    padding: "0",
    width: "20px"
  },
  noColorSwatchBox: {
    display: "flex",
    flexDirection: "row",
    mt: 1
  },
  noColorText: {
    ml: 1
  }
};

// function to conver rgba to hex value
const rgbHex = rgba => {
  // if rgba is not defined, return empty string
  if (rgba === "") {
    return "";
  }

  // determine the hex value from the RGBA string
  const color = rgba.replace(/[^0-9,.]/g, "").split(",");
  const rHex = Number(color[0]);
  const gHex = Number(color[1]);
  const bHex = Number(color[2]);
  const aHex = ((Number(color[3]) * 255) | (1 << 8)).toString(16).slice(1);

  return (
    (bHex | (gHex << 8) | (rHex << 16) | (1 << 24)).toString(16).slice(1) + aHex
  );
};

export default function Color({
  disabled = false,
  popoverWidth = "250px",
  showControls = true,
  showPicker = true,
  swatchSize = "small",
  value = "rgba(255,0,0,1)",
  anchorType = "anchorEl",
  onChange = () => {},
  ...props
}) {
  // create popover states
  const buttonRef = useRef(null);
  const [open, setOpen] = React.useState(props.open || false);

  // hex edit state
  const [hex, setHex] = React.useState(rgbHex(value));

  // no color state
  const [noColor, setNoColor] = React.useState(false);

  // check if the color is a valid color
  useEffect(() => {
    if (value === "") {
      setNoColor(true);
      setHex("");
    } else {
      setNoColor(false);
      setHex(rgbHex(value));
    }
  }, [value]);

  // handle color change
  const handleChange = color => {
    const changeValue = `rgba(${color.r},${color.g},${color.b},${color.a})`;
    onChange(changeValue);
  };

  // handle red
  const handleRedChange = event => {
    // get r,g,b,a values from rgba string
    const rgba = value.replace(/[^0-9,.]/g, "").split(",");
    const r = event.target.value;
    const g = rgba[1] || 0;
    const b = rgba[2] || 0;
    const a = rgba[3] || 1;

    // create new rgba string and call onChange and set the hex value
    const redChange = `rgba(${r},${Number(g)},${Number(b)},${Number(a)})`;
    onChange(redChange);
  };

  // handle green change
  const handleGreenChange = event => {
    // get r,g,b,a values from rgba string
    const rgba = value.replace(/[^0-9,.]/g, "").split(",");
    const r = rgba[0] || 0;
    const g = event.target.value;
    const b = rgba[2] || 0;
    const a = rgba[3] || 1;

    // create new rgba string and call onChange and set the hex value
    const greenChange = `rgba(${Number(r)},${g},${Number(b)},${Number(a)})`;
    onChange(greenChange);
  };

  // handle Blue change
  const handleBlueChange = event => {
    // get r,g,b,a values from rgba string
    const rgba = value.replace(/[^0-9,.]/g, "").split(",");
    const r = rgba[0] || 0;
    const g = rgba[1] || 0;
    const b = event.target.value;
    const a = rgba[3] || 1;

    // create new rgba string and call onChange and set the hex value
    const blueChange = `rgba(${Number(r)},${Number(g)},${b},${Number(a)})`;
    onChange(blueChange);
  };

  // handle alpha change
  const handleAlphaChange = event => {
    // get r,g,b,a values from rgba string
    const rgba = value.replace(/[^0-9,.]/g, "").split(",");
    const r = rgba[0] || 0;
    const g = rgba[1] || 0;
    const b = rgba[2] || 0;
    const a = event.target.value;

    // create new rgba string and call onChange and set the hex value
    const alphaChange = `rgba(${Number(r)},${Number(g)},${Number(b)},${a})`;
    onChange(alphaChange);
  };

  // handle popover open
  const handleClick = () => {
    setOpen(true);
  };

  // handle popover close
  const handleClose = () => {
    setOpen(false);
  };

  // get the red value from full rgba string
  const getRedColor = color => {
    // if color is not defined, return empty string
    if (color === "") {
      return "";
    }

    // determine the red value from the RGBA string
    const rgba = color.replace(/[^0-9,.]/g, "").split(",");
    let red = Number(rgba[0]);

    // if red value is empty, set red to empty string
    if (rgba[0] === "") {
      red = "";
    }

    return red;
  };

  // get the green value from full rgba string
  const getGreenColor = color => {
    // if color is not defined, return empty string
    if (color === "") {
      return "";
    }

    // determine the green value from the RGBA string
    const rgba = color.replace(/[^0-9,.]/g, "").split(",");
    let green = Number(rgba[1]);

    // if green value is empty, set green to empty string
    if (rgba[1] === "") {
      green = "";
    }

    return green;
  };

  // get the blue value from full rgba string
  const getBlueColor = color => {
    // if color is not defined, return empty string
    if (color === "") {
      return "";
    }

    // determine the blue value from the RGBA string
    const rgba = color.replace(/[^0-9,.]/g, "").split(",");
    let blue = Number(rgba[2]);

    // if blue value is empty, set blue to empty string
    if (rgba[2] === "") {
      blue = "";
    }

    return blue;
  };

  // get the alpha value from full rgba string
  const getAlpha = color => {
    // if color is not defined, return empty string
    if (color === "") {
      return "";
    }

    // determine the alpha value from the RGBA string
    const rgba = color.replace(/[^0-9,.]/g, "").split(",");
    let alpha = Number(rgba[3]);

    // if alpha value is empty, set alpha to empty string
    if (rgba[3] === "") {
      alpha = "";
    }

    return alpha;
  };

  // get the rgba object from the full rgba string
  const getRgbaObj = color => {
    // if color is not defined, return undefined
    if (color === "") {
      return undefined;
    }

    const rgba = color.replace(/[^0-9,.]/g, "").split(",");
    return {
      a: Number(rgba[3]),
      b: Number(rgba[2]),
      g: Number(rgba[1]),
      r: Number(rgba[0])
    };
  };

  // handle hex change
  const handleHexChange = event => {
    const value = event.target.value;
    setHex(value);

    // determine rbga values as hex
    const rHex = parseInt(value.substring(0, 2), 16);
    const gHex = parseInt(value.substring(2, 4), 16);
    const bHex = parseInt(value.substring(4, 6), 16);
    let aHex = parseInt(value.substring(6, 8), 16);

    // if alpha is defined in hex set alpha to 255 (full opacity)
    if (isNaN(aHex)) {
      aHex = 255;
    }

    // set color as rgba string with new converted hex values
    // alpha is divied by 255 to value between 0 and 1
    onChange(`rgba(${rHex},${gHex},${bHex},${aHex / 255})`);
  };

  // handle no color
  const handleNoColor = () => {
    // set all rgb values and hex to empty
    onChange("");
  };

  // handle button / swatch size
  let swatchDimensions;
  switch (swatchSize) {
    case "small":
      swatchDimensions = "15";
      break;
    case "medium":
      swatchDimensions = "20";
      break;
    case "large":
      swatchDimensions = "30";
      break;
    default:
      swatchDimensions = "15";
  }

  // define swatch background color depending on no color state or if value is undefined
  let swatchBackground;
  if (noColor) {
    swatchBackground =
      "linear-gradient(to top left, rgba(255,0,0,0) 0%, rgba(255,0,0,0) calc(50% - 0.8px),rgba(255,0,0,1) 50%,rgba(255,0,0,0) calc(50% + 0.8px),rgba(0,0,0,0) 100% )";
  } else {
    swatchBackground = value;
  }
  return (
    <Box>
      <Button
        sx={
          (sx.swatch,
          {
            "&:hover": {
              backgroundColor: value !== "" ? value : "transparent"
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
                  <RgbaColorPicker
                    color={getRgbaObj(value)}
                    onChange={handleChange}
                    id="colorPicker"
                  />
                </Box>
              </Box>
            )}
            <Box sx={sx.noColorSwatchBox}>
              <Button
                data-testid="NoColorButton"
                sx={sx.noColorSwatch}
                onClick={handleNoColor}
              />
              <Typography sx={sx.noColorText}> No Color</Typography>
            </Box>
            {showControls && (
              <div>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <TextField
                    data-testid="redTextField"
                    id="red"
                    type="number"
                    size="small"
                    margin="dense"
                    max="255"
                    label="Red"
                    error={getRedColor(value) > 255}
                    value={getRedColor(value)}
                    sx={{ width: "33%" }}
                    InputLabelProps={{
                      shrink: true
                    }}
                    onChange={handleRedChange}
                    inputProps={{ max: 255, min: 0 }}
                  />
                  <TextField
                    data-testid="greenTextField"
                    id="green"
                    type="number"
                    size="small"
                    margin="dense"
                    max="255"
                    label="Green"
                    error={getGreenColor(value) > 255}
                    value={getGreenColor(value)}
                    sx={{ width: "33%" }}
                    InputLabelProps={{
                      shrink: true
                    }}
                    onChange={handleGreenChange}
                    inputProps={{ max: 255, min: 0 }}
                  />
                  <TextField
                    data-testid="blueTextField"
                    id="blue"
                    type="number"
                    size="small"
                    margin="dense"
                    max="255"
                    label="Blue"
                    error={getBlueColor(value) > 255}
                    value={getBlueColor(value)}
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
                  id="alpha"
                  type="number"
                  size="small"
                  margin="dense"
                  max="1"
                  label="Alpha (Transparency)"
                  error={getAlpha(value) > 1}
                  value={getAlpha(value)}
                  fullWidth
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={handleAlphaChange}
                  inputProps={{ max: 1, min: 0, step: 0.1 }}
                />
                <TextField
                  data-testid="hexTextField"
                  id="hex"
                  size="small"
                  margin="dense"
                  label="Hex"
                  value={hex}
                  fullWidth
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={handleHexChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">#</InputAdornment>
                    )
                  }}
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
