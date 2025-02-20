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
  gate?: string;
};

export type VehicleSelectProps = {
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
};

export type VehicleSelectDialogProps = {
  /**
   * The text of the cancel button.
   */
  cancelText?: string;
  /**
   * Error message to display in the dialog.
   */
  errorMessage?: string;
  /**
   * Callback fired when cancel button clicked.
   */
  onCancelClick: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * Callback fired when save button clicked.
   */
  onSaveClick: (vehicle: SelectedVehicle[]) => void;
  /**
   * If true, the dialog is open.
   */
  open?: boolean;
  /**
   * The text of the save button.
   */
  saveText?: string;
  /**
   * If true, shows close icon in dialog title
   */
  showCloseIcon?: boolean;
  /**
   * The title of the dialog.
   */
  title?: string;
  /**
   * The width of the dialog. Valid css width can be used.
   */
  width?: string;
};

// Create a new type that merges VehicleSelectProps and VehicleSelectDialogProps
export type CombinedVehicleProps = Omit<
  VehicleSelectProps,
  "onChange" | "value"
> &
  VehicleSelectDialogProps;
