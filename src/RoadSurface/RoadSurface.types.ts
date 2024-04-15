/**
 * The props needed to define a road surface
 */
export type RoadSurfaceProps = {
  /**
   * A list of numbers defining the coordinates of points along the outline of the road
   * format: [x0, y0, x1, y2, ...]
   */
  points: number[];
  /**
   * The hex or css colour value for the surface of the road
   */
  color?: string;
};
