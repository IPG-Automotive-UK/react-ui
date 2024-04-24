export type Trajectory = {
  /**
   * A list of x coordinates defining the trajectory
   */
  x: number[];
  /**
   * A list of y coordinates defining the trajectory
   */
  y: number[];
  /**
   * A list of z coordinates defining the trajectory
   */
  z: number[];
  /**
   * An object containing the trajectory in real world coordinates (lat, long, elev)
   */
  GCS?: {
    /**
     * A list of latitudes defining the trajectory
     */
    lat: number[];
    /**
     * A list of longitudes defining the trajectory
     */
    long: number[];
    /**
     * A list of elevations defining the trajectory
     */
    elev: number[];
  };
  s: number[];
  /**
   * A list of the yaw angle of the vehicle
   */
  yaw?: number[];
};

export type Vehicle = {
  /**
   * The height of the rectangle
   */
  height: number;
  /**
   * The width of the rectangle
   */
  width: number;
  /**
   * The color fill of the rectangle (css string or hex value)
   */
  color?: string;
  /**
   * A label to render next to the rectangle for identification
   */
  label?: string;
};

export type Marker = {
  /**
   * The radius of the circle
   */
  radius: number;
  /**
   * The color fill of the circle (css string or hex value)
   */
  color?: string;
  /**
   * A label to render next to the rectangle for identification
   */
  label?: string;
};

export type VehiclePathProps = {
  /**
   * An object containing all data for a path/trajectory
   */
  path: Trajectory;
  /**
   * The index of the position along the trajectory to use for the vehicle position
   */
  index: number;
  /**
   * The vehicle position can
   */
  vehicle?: Marker | Vehicle;
  /**
   * Flag to render the path of the vehicle (default: true)
   */
  showPath?: boolean;
};
