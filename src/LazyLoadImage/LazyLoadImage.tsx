import React, { useEffect, useRef, useState } from "react";

import type { LazyLoadImageProps } from "./LazyLoadImage.types";
import { Skeleton } from "@mui/material";

// TODO: add tests in browser once we are done with the migration to cypress

/**
 * Lazy load wrapper for HTML image brackets. Used for lazy loading images.
 * @param LazyLoadImgProps The input object of the component
 * @param LazyLoadImgProps.src string Source of the image
 * @param LazyLoadImgProps.alt string Alternative text for the image
 * @param LazyLoadImgProps.ImgProps object ImgProps Any other prop of the <img> component
 */
export default function LazyLoadImage({
  src,
  alt,
  ImgProps = {}
}: LazyLoadImageProps) {
  // state to track if the image is visible
  const [isVisible, setIsVisible] = useState(false);

  // states to track the status of the image load, these influence whether to display alt, or MUI Skeleton
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // state variable to set the size for the skeleton to be displayed
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });

  // reference to the image element
  const imgRef = useRef<HTMLImageElement | null>(null);

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
    if (imgRef.current) {
      const { offsetWidth, offsetHeight } = imgRef.current;
      setDimensions({ height: offsetHeight, width: offsetWidth });
      observer.observe(imgRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Check if the image is already loaded from cache
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setIsLoaded(true);
    }
  }, [imgRef]);

  // a variable to decide whether to show the Skeleton, or the image (or the alt text in case an error happened during loading)
  const showSkeleton = isVisible && !isLoaded && !hasError;

  // deconstruct ImgProps and the style, to apply the needed style.display prop for the image to lazy load without issues
  const { style, ...restImgProps } = ImgProps || {};
  const { display, ...restStyle } = style || {};

  // render the image
  return (
    <>
      {showSkeleton ? (
        <Skeleton
          sx={{
            height: dimensions.height,
            width: dimensions.width
          }}
        />
      ) : null}
      <img
        alt={hasError ? alt : ""}
        loading="lazy"
        ref={imgRef}
        src={src}
        style={{
          ...restStyle,
          display: showSkeleton ? "none" : "block"
        }}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        {...restImgProps}
      />
    </>
  );
}
