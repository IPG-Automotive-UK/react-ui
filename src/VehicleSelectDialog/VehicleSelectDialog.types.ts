import {
  SelectedVehicle,
  VehicleSelectProps
} from "src/VehicleSelect/VehicleSelect.types";

export interface VehicleSelectDialogProps {
  /**
   * The text of the cancel button.
   */
  cancelText?: string;
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
}

// Create a new type that merges VehicleSelectProps and VehicleSelectDialogProps
export type CombinedVehicleProps = VehicleSelectProps &
  VehicleSelectDialogProps;
