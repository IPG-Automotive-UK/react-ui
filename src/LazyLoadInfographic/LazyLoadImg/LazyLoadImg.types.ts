import React from "react";

/**
 * Props for the LazyLoadImg component
 */
export type LazyLoadImgProps = {
  /**
   * Source of the image
   */
  src: string;
  /**
   * Alternative text for the image
   */
  alt: string;
  /**
   * Any other prop of the <img> component
   */
  ImgProps?: React.ComponentProps<"img">;
};
