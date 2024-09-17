import { CardMediaProps } from "@mui/material";

/**
 * Props for the LazyLoadImg component
 */
export type LazyLoadCardMediaProps = {
  /**
   * Source of the image
   */
  src: string;
  /**
   * Alternative text for the image
   */
  alt: string;
  /**
   * Any other prop of the CardContent component
   */
  CardMediaProps?: CardMediaProps;
};
