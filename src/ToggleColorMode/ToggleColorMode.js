import * as React from "react";
import Box from "@mui/material/Box";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";

export default function ToggleColorMode({ mode, onChange }) {
  // handle button click
  const handleClick = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    onChange(newMode);
  };

  // define components
  return (
    <Box
      sx={{
        alignItems: "center",
        bgcolor: "background.default",
        borderRadius: 1,
        color: "text.primary",
        display: "flex",
        justifyContent: "center",
        p: 3,
        width: "100%"
      }}
    >
      {mode} mode
      <IconButton sx={{ ml: 1 }} onClick={handleClick} color="inherit">
        {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );
}
ToggleColorMode.propTypes = {
  /**
   * The position of the Dialog.
   */
  mode: PropTypes.oneOf(["light", "dark"]),
  /**
   * Callback fired when the mode is changed.
   *
   * **Signature**
   * ```
   * function(newMode) => void
   * ```
   *
   * _newMode_: The new mode that has been selected
   */
  onChange: PropTypes.func.isRequired
};
