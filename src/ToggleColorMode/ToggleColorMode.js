import { Box, Switch } from "@mui/material";

import PropTypes from "prop-types";
import React from "react";
import { styled } from "@mui/material/styles";

export default function ToggleColorMode({ mode, onChange }) {
  // handle switch change
  const handleChange = event => {
    const newMode = mode === "dark" ? "light" : "dark";
    onChange(newMode);
  };

  // customise switch
  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase": {
      "&.Mui-checked": {
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
          opacity: 1
        },
        "& .MuiSwitch-thumb:before": {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            "#003063"
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`
        },
        color: "#fff",
        transform: "translateX(22px)"
      },
      margin: 1,
      padding: 0,
      transform: "translateX(6px)"
    },
    "& .MuiSwitch-thumb": {
      "&:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#003063"
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        content: "''",
        height: "100%",
        left: 0,
        position: "absolute",
        top: 0,
        width: "100%"
      },
      backgroundColor: "#fff",
      height: 32,
      width: 32
    },
    "& .MuiSwitch-track": {
      backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      borderRadius: 20 / 2,
      opacity: 1
    },
    height: 34,
    padding: 7,
    width: 62
  }));

  // Switch to change mode
  return (
    <Box>
      <MaterialUISwitch
        sx={{ m: 1 }}
        checked={mode === "dark"}
        onChange={handleChange}
      />
    </Box>
  );
}
ToggleColorMode.propTypes = {
  /**
   * The color mode selection
   * @default "light"
   */
  mode: PropTypes.oneOf(["light", "dark"]),
  /**
   * Callback fired when the color mode is changed.
   *
   * **Signature**
   * ```
   * function(newMode) => void
   * ```
   *
   * _newMode_: The new color mode that has been selected
   */
  onChange: PropTypes.func.isRequired
};
