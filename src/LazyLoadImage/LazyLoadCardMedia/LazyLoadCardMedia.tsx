import React, { useEffect, useRef, useState } from "react";

import { CardMedia } from "@mui/material";
import { LazyLoadCardMediaProps } from "./LazyLoadCardMedia.types";

/**
 * Lazy load wrapper for MUI CardMedia component. Used for lazy loading infographics inside a card component.
 * @param LazyLoadCardMediaProps The input object of the component
 * @param @param LazyLoadCardMediaProps.src string Source of the image
 * @param @param LazyLoadCardMediaProps.CardMediaProps object ImgProps Any other prop of the <img> component
 */
export default function LazyLoadCardMedia({
  src,
  CardMediaProps
}: LazyLoadCardMediaProps) {
  // state variable to decide whether to show the image or not
  const [isVisible, setIsVisible] = useState(false);

  // state variable to decide if an image is on screen (in viewport)
  const imgRef = useRef(null);

  useEffect(() => {
    // create an intersection observer
    const observer = new IntersectionObserver(
      // callback for the observer
      entries => {
        // if an image intersecting, than it should be loaded, so set the state variable for it to true
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      // if at least 1% of an image is in on screen, consider it intersected
      { threshold: 0.01 }
    );

    // observe the element
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    // clean up
    return () => observer.disconnect();
  }, []);

  return (
    <CardMedia
      component="img"
      ref={imgRef}
      src={isVisible ? src : undefined}
      {...CardMediaProps}
    />
  );
}
