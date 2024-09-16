import React, { useEffect, useRef, useState } from "react";

import type { LazyLoadImgProps } from "./LazyLoadImg.types";

/**
 * Lazy load wrapper for HTML image brackets. Used for lazy loading infographics which are loaded as an <img> component.
 * @param LazyLoadImgProps The input object of the component
 * @param @param LazyLoadImgProps.src string Source of the image
 * @param @param LazyLoadImgProps.alt string Alternative text for the image
 * @param @param LazyLoadImgProps.ImgProps object ImgProps Any other prop of the <img> component
 */
export default function LazyLoadImg({ src, alt, ImgProps }: LazyLoadImgProps) {
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

  // return the lazy loaded image (load is based on the isVisible state variable)
  return (
    <img
      ref={imgRef}
      src={isVisible ? src : undefined}
      alt={alt}
      {...ImgProps}
    />
  );
}
