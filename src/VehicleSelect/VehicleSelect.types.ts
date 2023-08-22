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
   * Array of gates to display
   */
  allGates: string[];
  /**
   * Array of project code options to display
   */
  vehicles: Vehicle[];
  /**
   * The currently selected project code
   */
  selectedVehicle: SelectedVehicle[];
  /**
   * FlexDirection of the component
   */
  flexDirection?: "row" | "column";
  /**
   * FlexWrap of the component
   */
  flexWrap?: "wrap" | "nowrap";
  /**
   * Callback function won each vehicle metadata change
   */
  onVehicleChange: (value: SelectedVehicle[]) => void;
}
