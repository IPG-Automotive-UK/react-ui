import { Box, CardMedia, Skeleton } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import { InfographicProps } from "./Infographic.types";
import VersionChip from "../../VersionChip/VersionChip";

// TODO: add tests in browser once we are done with the migration to cypress. The old tests live in a txt file in this folder until then.

const Infographic = ({ media, version }: InfographicProps) => {
  // state to track if the image is visible
  const [isVisible, setIsVisible] = useState(false);

  // states to track the status of the image load, these influence whether to display alt, or MUI Skeleton
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // reference to the bounding box of the infographic
  const boxRef = useRef(null);

  // variables to store the pre-defined image (and skeleton) dimensions
  const imageHeight = 190;
  const imageWidth = 336;

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

  // a variable to decide whether to show the Skeleton, or the image (or the alt text in case an error happened during loading)
  const showSkeleton = !isVisible || (isVisible && !isLoaded && !hasError);

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
      {showSkeleton ? (
        <Skeleton
          sx={{
            boxSizing: "content-box",
            height: imageHeight,
            objectFit: "contain",
            padding: 2,
            width: imageWidth
          }}
        />
      ) : null}
      <CardMedia
        component="img"
        alt={hasError ? "card-infographic" : ""}
        loading="lazy"
        src={media}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        sx={{
          boxSizing: "content-box",
          display: isVisible ? "block" : "none",
          height: imageHeight,
          objectFit: "contain",
          padding: 2,
          width: showSkeleton ? 0 : imageWidth
        }}
      />
      {version ? (
        <Box
          position={"absolute"}
          display={showSkeleton ? "none" : "flex"}
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
