import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Popover,
  SvgIcon,
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

  // no color state use effect
  useEffect(() => {
    if (value === "rgba(0,0,0,0)") {
      setNoColor(true);
    }
  }, [value]);

  // handle color change
  const handleChange = color => {
    const changeValue = `rgba(${color.r},${color.g},${color.b},${color.a})`;
    onChange(changeValue);
    setHex(rgbHex(changeValue));

    // set no color state
    setNoColor(false);
  };

  // handle red
  const handleRedChange = event => {
    const rgba = value.replace(/[^0-9,.]/g, "").split(",");
    const redChange = `rgba(${event.target.value},${Number(rgba[1])},${Number(
      rgba[2]
    )},${Number(rgba[3])})`;
    onChange(redChange);
    setHex(rgbHex(redChange));

    // set no color state
    setNoColor(false);
  };

  // handle green change
  const handleGreenChange = event => {
    const rgba = value.replace(/[^0-9,.]/g, "").split(",");
    const greenChange = `rgba(${Number(rgba[0])},${event.target.value},${Number(
      rgba[2]
    )},${Number(rgba[3])})`;
    onChange(greenChange);
    setHex(rgbHex(greenChange));

    // set no color state
    setNoColor(false);
  };

  // handle Blue change
  const handleBlueChange = event => {
    const rgba = value.replace(/[^0-9,.]/g, "").split(",");
    const blueChange = `rgba(${Number(rgba[0])},${Number(rgba[1])},${
      event.target.value
    },${Number(rgba[3])})`;
    onChange(blueChange);
    setHex(rgbHex(blueChange));

    // set no color state
    setNoColor(false);
  };

  // handle alpha change
  const handleAlphaChange = event => {
    const rgba = value.replace(/[^0-9,.]/g, "").split(",");
    const alphaChange = `rgba(${Number(rgba[0])},${Number(rgba[1])},${Number(
      rgba[2]
    )},${event.target.value})`;
    onChange(alphaChange);
    setHex(rgbHex(alphaChange));

    // set no color state
    setNoColor(false);
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

    // set no color state
    setNoColor(false);
  };

  // handle no color
  const handleNoColor = () => {
    // set all rgb values to 0 with 100% transparency
    onChange("rgba(0,0,0,0)");
    setNoColor(true);
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

  // define diagonal line based on swatch dimensions
  const diagonalLine = Number(swatchDimensions) + Number(swatchDimensions) / 3;
  const diagonalLineOrigin = Number(swatchDimensions) / 10;
  console.log(swatchDimensions);
  console.log(diagonalLineOrigin);
  console.log(diagonalLine);
  const noColorLine = `M ${diagonalLineOrigin},${diagonalLineOrigin} L ${diagonalLine},${diagonalLine}`;

  return (
    <Box>
      <Button
        sx={
          (sx.swatch,
          {
            "&:hover": {
              backgroundColor: value
            },
            background: value,
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
      >
        {noColor ? (
          <SvgIcon>
            <path
              // create diagonal lines
              d={noColorLine}
              strokeWidth="2"
              stroke="red"
            />
          </SvgIcon>
        ) : null}
      </Button>
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
              <IconButton sx={sx.noColorSwatch} onClick={handleNoColor}>
                <SvgIcon>
                  <path
                    // create diagonal lines
                    d="M 3,3 L 21,21"
                    strokeWidth="2"
                    stroke="red"
                  />
                </SvgIcon>
              </IconButton>
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
                    label="Red"
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
                    label="Green"
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
                    label="Blue"
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
                  label="Alpha (Transparency)"
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
