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
  projectCode: string;
  modelYear: string;
  variant: string;
  gate: string;
};

export interface VehicleSelectProps {
  /**
   * FlexDirection of the component
   */
  flexDirection?: string;
  /**
   * FlexWrap of the component
   */
  flexWrap?: string;
  /**
   * List of gates to show in the dropdown
   */
  gates: string[];
  /**
   * Callback function fired on each vehicle metadata change
   */
  onChange: (value: SelectedVehicle[]) => void;
  /**
   * The currently selected vehicles
   */
  value: SelectedVehicle[];
  /**
   * Array of all vehicle variants with fields _id, modelYear, projectCode, variant
   */
  variants: Vehicle[];
}
