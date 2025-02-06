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
   * Disable the component if true (default is false)
   */
  disabled?: boolean;
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
   * List of gates to show in the dropdown
   */
  gates?: string[];
  /**
   * Size of the field
   */
  size?: "small" | "medium";
  /**
   * The maximum number of tags that will be visible. Set -1 to disable the limit.
   */
  limitTags?: number;
};

/**
 * Props for determining auto‑selection.
 */
export type ShouldAutoSelectProps = {
  /**
   * The currently selected field value.
   */
  selectedValue: string;
  /**
   * The list of available options.
   */
  availableOptions: string[];
  /**
   * Whether the user has manually cleared the field.
   */
  userCleared: boolean;
};

/**
 * Props for filtering vehicles.
 */
export type FilterVehiclesProps = {
  /**
   * The complete list of vehicles.
   */
  variants: Vehicle[];
} & Pick<Vehicle, "projectCode" | "modelYear"> &
  Partial<Pick<Vehicle, "variant">>;

/**
 * Props for creating a vehicle record.
 */
export type CreateVehicleRecordProps = Omit<Vehicle, "_id">;
