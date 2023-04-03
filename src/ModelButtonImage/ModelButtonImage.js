import PropTypes from "prop-types";
import React from "react";

// ModelButtonImage component is used to display the model icon in the ModelButton component.
export default function ModelButtonImage({ src }) {
  return (
    <>
      {src && src.length > 0 ? (
        <img
          alt="model-icon"
          src={src}
          style={{
            filter: theme =>
              theme.palette.mode === "light" ? "invert(0)" : "invert(1)"
          }}
        />
      ) : null}
    </>
  );
}

ModelButtonImage.propTypes = {
  src: PropTypes.string
};
