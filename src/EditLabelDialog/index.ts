import type { DialogProps } from "@mui/material/Dialog";
import EditLabelDialog from "./EditLabelDialog";
import type { Label } from "../LabelSelector/Label.types";

export type EditLabelDialogProps = {
  /**
   * If true, the component is shown.
   */
  isOpen?: boolean;
  /**
   * The label to be edited.
   */
  label?: Label;
  /**
   * Callback fired when the component requests to be closed.
   */
  onClose?: DialogProps["onClose"];
  /**
   * Callback fired when a label is edited.
   */
  onEdit?: (editedLabel: Label) => void;
  /**
   * Callback fired when a new label is added.
   */
  onNew?: (newLabel: Label) => void;
  /**
   * The array of label objects that are options to render in the listbox.
   */
  options?: Label[];
  /**
   * The title of the dialog.
   */
  title: string;
};

export default EditLabelDialog as React.FC<EditLabelDialogProps>;
