import { Box } from "@mui/material";
import React from "react";
import { RgbaColorPicker } from "react-colorful";

// styling
const sx = {
  colorBox: {
    cursor: "pointer"
  },
  colorPicker: {
    // "& .react-colorful": {
    //   width: "100%"
    // },
    // "& .react-colorful__alpha": {
    //   "border-radius": "1 0 0 0"
    // },
    // "& .react-colorful__alpha-pointer": {
    //   "border-radius": "4 4 0 0",
    //   height: "20px",
    //   width: "20px"
    // },
    // "& .react-colorful__hue-pointer": {
    //   "border-radius": "4 4 0 0",
    //   height: "20px",
    //   width: "20px"
    // },
    // "& .react-colorful__last-control": {
    //   "border-radius": "0 0 0 0"
    // },
    // "& .react-colorful__saturation": {
    //   "border-radius": "0 0 0 0"
    // },
    // "& .react-colorful__saturation-pointer": {
    //   "border-radius": "4 4 0 0",
    //   height: "20px",
    //   width: "20px"
    // }
  }
};

export default function Color(props) {
  // create colour picker open state
  const [open, setOpen] = React.useState(false);

  // create color states
  const [color, setColor] = React.useState("rgba(255,0,0,1)");

  // handle onClick
  const handleClick = () => {
    setOpen(!open);
  };

  const handleChange = color => {
    setColor(`rgba(${color.r},${color.g},${color.b},${color.a})`);
  };

  // convert color string to rgba object
  const rgba = color.substring(5, color.length - 1).split(",");
  const rgbaObj = {
    r: Number(rgba[0]),
    g: Number(rgba[1]),
    b: Number(rgba[2]),
    a: Number(rgba[3])
  };

  return (
    <div>
      <div onClick={handleClick}>
        <Box
          sx={
            (sx.colorBox,
            {
              background: color,
              height: props.height || "14px",
              width: props.width || "36px"
            })
          }
        />
      </div>
      {open && (
        <div sx={{ position: "absolute", zIndex: 2 }}>
          <RgbaColorPicker
            sx={sx.colorPicker}
            color={rgbaObj}
            onChange={handleChange}
          />
        </div>
      )}
    </div>
  );
}
