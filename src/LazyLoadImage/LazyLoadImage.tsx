import React, { useEffect, useRef, useState } from "react";

import type { LazyLoadImgProps } from "./LazyLoadImage.types";

/**
 * Lazy load wrapper for HTML image brackets. Used for lazy loading images.
 * @param LazyLoadImgProps The input object of the component
 * @param LazyLoadImgProps.src string Source of the image
 * @param LazyLoadImgProps.alt string Alternative text for the image
 * @param LazyLoadImgProps.ImgProps object ImgProps Any other prop of the <img> component
 */
export default function LazyLoadImg({ src, alt, ImgProps }: LazyLoadImgProps) {
  // state to track if the image is visible
  const [isVisible, setIsVisible] = useState(false);

  // reference to the image element
  const imgRef = useRef(null);

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
      observer.observe(imgRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // render the image
  return (
    <img
      alt={alt || ""}
      ref={imgRef}
      loading="lazy"
      src={isVisible ? src : undefined}
      style={{ display: isVisible ? "block" : "none" }}
      {...ImgProps}
    />
  );
}
