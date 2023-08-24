// Vehicle types
export type Vehicle = {
  _id: string;
  modelYear: string;
  projectCode: string;
  variant: string;
};

// types for the selected vehicle
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
  allVehicles: Vehicle[];
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
