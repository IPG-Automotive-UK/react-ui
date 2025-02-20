import type {
  Vehicle,
  VehicleSelectorProps
} from "../VehicleSelector/VehicleSelector.types";

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
  onSaveClick: (vehicle: Vehicle[]) => void;
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
  VehicleSelectorProps,
  "onChange" | "value"
> &
  VehicleSelectDialogProps;
