import { Box, Popover, TextField } from "@mui/material";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { RgbaColorPicker } from "react-colorful";

// styling
const sx = {
  colorBox: {
    cursor: "pointer"
  },
  colorPicker: {
    "& .react-colorful": {
      width: "100%"
    },
    "& .react-colorful__alpha": {
      "border-radius": "1 0 0 0"
    },
    "& .react-colorful__alpha-pointer": {
      "border-radius": "4 4 0 0",
      height: "15px",
      width: "15px"
    },
    "& .react-colorful__hue-pointer": {
      "border-radius": "4 4 0 0",
      height: "15px",
      width: "15px"
    },
    "& .react-colorful__last-control": {
      "border-radius": "0 0 0 0"
    },
    "& .react-colorful__saturation": {
      "border-radius": "0  0 0"
    },
    "& .react-colorful__saturation-pointer": {
      "border-radius": "4 4 0 0",
      height: "15px",
      width: "15px"
    }
  }
};

export default function Color({
  height = "15px",
  width = "30px",
  value = "rgba(255,0,0,1)",
  onChange = () => {}
}) {
  // create color states
  const [color, setColor] = React.useState(value);

  // create popover states
  const [anchorEl, setAnchorEl] = React.useState(null);

  // set color everytime color is changed
  useEffect(() => {
    setColor(value);
  }, [value]);

  // handle color change
  const handleChange = color => {
    onChange(setColor(`rgba(${color.r},${color.g},${color.b},${color.a})`));
  };

  // handle red change
  const handleRedChange = event => {
    const rgba = color.substring(5, color.length - 1).split(",");
    onChange(
      setColor(
        `rgba(${event.target.value},${Number(rgba[1])},${Number(
          rgba[2]
        )},${Number(rgba[3])})`
      )
    );
  };

  // handle green change
  const handleGreenChange = event => {
    const rgba = color.substring(5, color.length - 1).split(",");
    onChange(
      setColor(
        `rgba(${Number(rgba[0])},${event.target.value},${Number(
          rgba[2]
        )},${Number(rgba[3])})`
      )
    );
  };

  // handle Blue change
  const handleBlueChange = event => {
    const rgba = color.substring(5, color.length - 1).split(",");
    onChange(
      setColor(
        `rgba(${Number(rgba[0])},${Number(rgba[1])},${
          event.target.value
        },${Number(rgba[3])})`
      )
    );
  };

  // handle alpha change
  const handleAlphaChange = event => {
    const rgba = color.substring(5, color.length - 1).split(",");
    onChange(
      setColor(
        `rgba(${Number(rgba[0])},${Number(rgba[1])},${Number(rgba[2])},${
          event.target.value
        })`
      )
    );
  };

  // handle popover open
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  // handle popover close
  const handleClose = () => {
    setAnchorEl(null);
  };

  // open and id states
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // convert color string to rgba object
  const rgba = color.substring(5, color.length - 1).split(",");
  const rgbaObj = {
    r: Number(rgba[0]),
    g: Number(rgba[1]),
    b: Number(rgba[2]),
    a: Number(rgba[3])
  };

  return (
    <Box>
      <Box onClick={handleClick}>
        <Box
          sx={
            (sx.colorBox,
            {
              background: color,
              height: height,
              width: width
            })
          }
        />
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ width: "250px", m: 1 }}>
            <Box sx={{ width: "250px" }}>
              <Box sx={sx.colorPicker}>
                <RgbaColorPicker color={rgbaObj} onChange={handleChange} />
              </Box>
            </Box>
            <Box sx={{ mt: 1, display: "flex", flexDirection: "row" }}>
              <TextField
                id="outlined-number"
                type="number"
                size="small"
                margin="dense"
                label="Red"
                value={rgbaObj.r}
                sx={{ width: "33%" }}
                InputLabelProps={{
                  shrink: true
                }}
                onChange={handleRedChange}
                inputProps={{ min: 0, max: 255 }}
              />
              <TextField
                id="outlined-number"
                type="number"
                size="small"
                margin="dense"
                label="Green"
                value={rgbaObj.g}
                sx={{ width: "33%" }}
                InputLabelProps={{
                  shrink: true
                }}
                onChange={handleGreenChange}
                inputProps={{ min: 0, max: 255 }}
              />
              <TextField
                id="outlined-number"
                type="number"
                size="small"
                margin="dense"
                label="Blue"
                value={rgbaObj.b}
                sx={{ width: "33%" }}
                InputLabelProps={{
                  shrink: true
                }}
                onChange={handleBlueChange}
                inputProps={{ min: 0, max: 255 }}
              />
            </Box>
            <TextField
              id="outlined-number"
              type="number"
              size="small"
              margin="dense"
              label="Alpha (Transparency)"
              value={rgbaObj.a}
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              onChange={handleAlphaChange}
              inputProps={{ min: 0, max: 1, step: 0.1 }}
            />
          </Box>
        </Box>
      </Popover>
    </Box>
  );
}

Color.propTypes = {
  /**
   * rgba color string
   */
  value: PropTypes.string,
  /**
   * rgba color string
   */
  height: PropTypes.string,
  /**
   * rgba color string
   */
  width: PropTypes.string
};
