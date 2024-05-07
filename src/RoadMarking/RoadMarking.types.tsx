export type RoadMarkingProps = {
  /**
   * The points representing the path of the marking [x0, y0, x1, y1, ...]
   */
  points: number[];
  /**
   * In the case of non-solid lines, a list of two number containing the dash and space lengths [<dashLength>, <spaceLength>]
   */

  dash?: [number, number] | [];
  /**
   * The width of the marking
   */
  width?: number;
  /**
   * The type of road marking
   */
  type?: "single" | "double";
  /**
   * The color of the marking hex or css colour
   */
  color?: string;
};
