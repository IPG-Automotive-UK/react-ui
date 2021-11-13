import { Box, Popover } from "@mui/material";
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

  // set color everytime color is changed
  useEffect(() => {
    setColor(value);
  }, [value]);

  const handleChange = color => {
    onChange(setColor(`rgba(${color.r},${color.g},${color.b},${color.a})`));
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
        <Box sx={{ display: "flex" }}>
          <Box sx={{ width: "200px", height: "200px", m: 1 }}>
            <Box sx={sx.colorPicker}>
              <RgbaColorPicker color={rgbaObj} onChange={handleChange} />
            </Box>
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
