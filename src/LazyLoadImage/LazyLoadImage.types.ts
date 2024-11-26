import React from "react";

/**
 * Props for the LazyLoadImg component
 */
export type LazyLoadImageProps = {
  /**
   * Alternative text for the image
   */
  alt: string;
  /**
   * Flag to enable the skeleton adjusting size to the bounding element. Default is false.
   */
  autoFitSkeleton?: boolean;
  /**
   * Any other prop of the <img> component
   */
  ImgProps?: Omit<React.ComponentProps<"img">, "src" | "alt">;
  /**
   * Source of the image
   */
  src: string;
};
