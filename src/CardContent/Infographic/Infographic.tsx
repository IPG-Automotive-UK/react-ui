import { Box, CardMedia } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import { InfographicProps } from "./Infographic.types";
import VersionChip from "../../VersionChip/VersionChip";

const Infographic = ({ media, version }: InfographicProps) => {
  // state to track if the image is visible
  const [isVisible, setIsVisible] = useState(false);

  // reference to the bounding box of the infographic
  const boxRef = useRef(null);

  // when the image is in view, set isVisible to true
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (boxRef.current) {
      observer.observe(boxRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // render the card infographic content
  // CardMedia and the version chip is rendered conditionally
  return (
    <Box
      className="infographic-container"
      position={"relative"}
      ref={boxRef}
      sx={{
        display: "flex",
        justifyContent: "center",
        width: 368
      }}
    >
      <CardMedia
        component="img"
        image={isVisible ? media : undefined}
        loading="lazy"
        sx={{
          boxSizing: "content-box",
          display: isVisible ? "block" : "none",
          height: 190,
          objectFit: "contain",
          padding: 2,
          width: 336
        }}
      />
      {version ? (
        <Box
          position={"absolute"}
          display={isVisible ? "flex" : "none"}
          alignItems={"end"}
          sx={{
            height: 190,
            padding: 2,
            width: 336
          }}
        >
          <Box padding={1} sx={{ maxWidth: 320 }}>
            <VersionChip version={version} />
          </Box>
        </Box>
      ) : null}
    </Box>
  );
};

export default Infographic;
