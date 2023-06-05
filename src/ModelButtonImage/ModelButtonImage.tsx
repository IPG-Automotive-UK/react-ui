import { Box, useTheme } from "@mui/material";

import { ModelButtonImageProps } from "./ModelButtonImage.types";
import PropTypes from "prop-types";
import React from "react";
import { colord } from "colord";
import solve from "./color2filter";

// ModelButtonImage component is used to display the model icon in the ModelButton component.
export default function ModelButtonImage({
  src,
  color
}: ModelButtonImageProps) {
  // convert color to CSS filter
  const theme = useTheme();
  const defaultColor =
    theme.palette.mode === "light"
      ? theme.palette.common.black
      : theme.palette.common.white;
  const filter = solve(colord(color ?? defaultColor).toRgb());

  // render
  return (
    <React.Fragment>
      <Box
        component="img"
        alt="model-icon"
        src={src}
        sx={{
          filter,
          maxHeight: "60px",
          maxWidth: "60px",
          position: "absolute"
        }}
      />
    </React.Fragment>
  );
}

// prop types for ModelButtonImage component.
ModelButtonImage.propTypes = {
  /**
   * The image source.
   */
  src: PropTypes.string.isRequired
};
