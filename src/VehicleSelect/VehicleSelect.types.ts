// User group
export type UserGroup = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

// Vehicle milestone timing
export type Timing = {
  gate: string;
  date: string;
};

// Vehicle project milestone
export type Milestone = {
  timings: Timing[];
  color: string;
};
export type EmptyMilestone = {
  timings: [];
};

// Vehicle
export type Vehicle = {
  DMF?: string;
  __v: number;
  _id: string;
  bodyStyle?: string;
  brakeCircuit?: string;
  brand: string;
  drive: string;
  driveSource: string;
  engineOrientation?: string;
  frontDiffType?: string;
  milestones: EmptyMilestone | Milestone[];
  modelYear: string;
  mountElectricMotor?: string;
  numberElectricMotors?: number | null;
  numberEngineMounts?: number | null;
  powerSteering: string;
  powerSupplyEV?: string;
  powertrain?: string;
  powertrainCoordinateOrientation: string;
  powertrainCoordinateOrigin: string;
  projectCode: string;
  rearDiffType?: string;
  restricted: boolean;
  restrictedGroups: UserGroup[];
  rimSizeFA: string;
  rimSizeRA: string;
  suspension: string;
  systemPowerkW: number;
  tireAspectRatioFA: number;
  tireAspectRatioRA: number;
  tireWidthFA: number;
  tireWidthRA: number;
  transmissionGears: number;
  transmissionType: string;
  transmissonGears: number | null;
  turbochargerEquipped?: string;
  variant: string;
  vehicleCoordinateOrientation: string;
  vehicleCoordinateOrigin: string;
  vehicleSegment: string;
};

export type SelectedVehicle = {
  _id: string;
  project: string;
  modelYear: string;
  variant: string;
  gate: string;
};

export interface VehicleSelectProps {
  /**
   * List of gates to show in the dropdown
   */
  allGates: string[];
  /**
   * Array of all vehicles
   */
  allVehicles: Pick<Vehicle, "_id" | "projectCode" | "modelYear" | "variant">[];
  /**
   * The currently selected vehicles
   */
  selectedVehicles: SelectedVehicle[];
  /**
   * FlexDirection of the component
   */
  flexDirection?: "row" | "column";
  /**
   * FlexWrap of the component
   */
  flexWrap?: "wrap" | "nowrap";
  /**
   * Callback function fired on each vehicle metadata change
   */
  onVehicleChange: (value: SelectedVehicle[]) => void;
}
