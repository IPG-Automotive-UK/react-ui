import { Box } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { useTheme } from "@mui/material/styles";

// ModelButtonImage component is used to display the model icon in the ModelButton component.
export default function ModelButtonImage({ src }) {
  const theme = useTheme();

  return (
    <Box
      component="img"
      alt="model-icon"
      src={src}
      style={{
        filter: theme.palette.mode === "dark" ? "invert(1)" : "invert(0)"
      }}
    />
  );
}

// prop types for ModelButtonImage component.
ModelButtonImage.propTypes = {
  /**
   * The image source.
   */
  src: PropTypes.string.isRequired
};
