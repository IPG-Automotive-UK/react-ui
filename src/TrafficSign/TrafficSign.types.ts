/**
 * Properties of the TrafficSign component
 */

export interface TrafficSignProps {
  /**
   * The type of the traffic sign
   */
  type:
    | "barrier"
    | "barrier2S"
    | "beaconArrowL"
    | "beaconArrowR"
    | "beaconHatchedWide"
    | "beaconHatchedWideL"
    | "beaconHatchedWideR"
    | "beaconL"
    | "beaconL2S"
    | "beaconR2S"
    | "beaconR"
    | "caution"
    | "children"
    | "crossroads"
    | "curveL"
    | "curveR"
    | "cyclistsCrossing"
    | "cyclistsCrossingL"
    | "cyclistsCrossingR"
    | "deadEnd"
    | "directionBoardL"
    | "directionBoardR"
    | "directionBoardWideL"
    | "directionBoardWideR"
    | "diversionL"
    | "diversionR"
    | "endOfLimitations"
    | "exitHighway"
    | "exitInnerCityRoad"
    | "exitLimitedAccessRoad"
    | "fileUnknown"
    | "giveWay"
    | "highway"
    | "highwayEnd"
    | "icy"
    | "limitedAccessRoad"
    | "limitedAccessRoadEnd"
    | "livingStreet"
    | "livingStreetEnd"
    | "minimumSpeed"
    | "minimumSpeedEnd"
    | "narrowRoad"
    | "narrowRoadL"
    | "narrowRoadR"
    | "noEntry"
    | "noOvertaking"
    | "noOvertakingEnd"
    | "noOvertakingTrucks"
    | "noOvertakingTrucksEnd"
    | "noTraffic"
    | "oneWayLeft"
    | "oneWayRight"
    | "oneWayStraight"
    | "parkingGarage"
    | "parkingLot"
    | "passL"
    | "passR"
    | "pedestrianCrossing"
    | "pedestrians"
    | "priorityRoad"
    | "priorityRoadEnd"
    | "rightOfWay"
    | "roadWorks"
    | "roundabout"
    | "sCurveL"
    | "sCurveR"
    | "slipperyRoad"
    | "speedLimit"
    | "speedLimitEnd"
    | "speedLimitZone"
    | "speedLimitZoneEnd"
    | "steepAscent"
    | "steepDescent"
    | "stop"
    | "straightOrLeft"
    | "straightOrRight"
    | "trafficLight"
    | "trafficQueues"
    | "tunnel"
    | "turnAheadL"
    | "turnAheadR"
    | "turnL"
    | "turnR"
    | "unevenRoad"
    | "urbanArea"
    | "urbanAreaEnd"
    | "warningPedestrianCrossing"
    | "weightLimit"
    | "widthLimit";
  /**
   * The coordinates of the sign in Fr0 [x,y]
   */
  points: number[];
  /**
   * The value of the sign (e.g., speed limit)
   */
  value?: string;
  /**
   * A rotation angle in degrees
   */
  angle?: number;
  /**
   * The scale of the image
   */
  scale?: number;
  /**
   * The size of the image individually in x and y
   */
  size?: {
    x: number;
    y: number;
  };
}
