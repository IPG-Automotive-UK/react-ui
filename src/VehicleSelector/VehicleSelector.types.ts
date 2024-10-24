/**
 * This type defines the Vehicle object
 */
export type Vehicle = {
  /**
   * The id of the vehicle
   */
  _id: string;
  /**
   * The project code of the vehicle
   */
  projectCode: string;
  /**
   * The model year of the vehicle
   */
  modelYear: string;
  /**
   * The variant of the vehicle
   */
  variant: string;
  /**
   * The gate of the vehicle, this is optional
   */
  gate?: string;
};

/**
 * This type defines the props for the VehicleSelector component
 */
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
  multipleGates?: boolean;
  /**
   * Callback function fired on each vehicle metadata change
   */
  onChange: (value: Vehicle[]) => void;
  /**
   * The currently selected vehicles
   */
  value: Vehicle[];
  /**
   * Array of all vehicle variants with fields _id, modelYear, projectCode, variant
   */
  variants: Vehicle[];
  /**
   * Allow multiple selections for the variant
   */
  multipleVariant?: boolean;
  /**
   * List of gates to show in the dropdown
   */
  gates?: string[];
  /**
   * Size of the field
   */
  size?: "small" | "medium";
  /**
   * limit the number of tags that are visible when not focused
   */
  limitTags?: number;
};
