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
   * Any other prop of the CardContent component
   */
  CardMediaProps?: Omit<CardMediaProps, "src">;
};
