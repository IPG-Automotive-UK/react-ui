import { SelectedVehicle, Vehicle } from "../VehicleSelect/VehicleSelect.types";

export type VehicleSelectorProps = {
  /**
   * FlexDirection of the component
   */
  flexDirection?: string;
  /**
   * FlexWrap of the component
   */
  flexWrap?: string;
  /**
   * Allow multiple selections
   */
  multipleSelection?: boolean;
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
  /**
   * List of gates to show in the dropdown
   */
  gates?: string[];
};
