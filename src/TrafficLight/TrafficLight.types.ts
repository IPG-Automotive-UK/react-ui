/**
 * Properties of the TrafficLight component
 */

export interface TrafficLightProps {
  /**
   * A list of two numbers representing the x and y coordinates in Fr0 [x, y]
   */
  points: number[];
  /**
   * The rotation angle of the traffic light to the origin
   */
  angle: number;
  /**
   * The type of traffic light (all types available in CarMaker)
   */
  type:
    | "red-yellow-green"
    | "red-yellow-green-straight"
    | "red-yellow-green-left"
    | "red-yellow-green-right"
    | "red-yellow-green-straight-left"
    | "red-yellow-green-straight-right"
    | "red-yellow-green-small"
    | "red-yellow"
    | "yellow-green"
    | "yellow-green-left"
    | "yellow-green-right"
    | "yellow-green-left-large"
    | "yellow-green-right-large"
    | "red-large"
    | "red-pedestrian"
    | "red-green-pedestrian";
  /**
   * The state of the traffic light, as given in CM
   * 0 - off
   * 1 - green
   * 2 - yellow
   * 3 - red
   * 4 - yellow-red
   * 5 - all-on (not a CM state, this only used for display)
   */
  state: 0 | 1 | 2 | 3 | 4 | 5;
  /**
   * An object defining the scale in x and y
   */
  scale?: { x: number; y: number };
}
