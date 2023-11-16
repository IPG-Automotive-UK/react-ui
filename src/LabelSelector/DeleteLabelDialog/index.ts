import DeleteLabelDialog from "./DeleteLabelDialog";
import type { DialogProps } from "@mui/material/Dialog";
import type { Label } from "../Label.types";

export type DeleteLabelDialogProps = {
  isOpen?: boolean;
  label?: Label;
  onClose?: DialogProps["onClose"];
  onDelete?: (deletedLabel: Label) => void;
};

export default DeleteLabelDialog as React.FC<DeleteLabelDialogProps>;
