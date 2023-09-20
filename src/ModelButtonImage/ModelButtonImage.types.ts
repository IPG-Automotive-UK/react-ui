import { AnyColor } from "colord";

export type ModelButtonImageProps = {
  /**
   * The image source.
   */
  src: string;
  /**
   * The color to filter the image to. Defaults to black in light mode and white in dark mode.
   */
  color?: AnyColor;
};
