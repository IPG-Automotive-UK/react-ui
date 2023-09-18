import type { DialogProps } from "@mui/material/Dialog";
import type { Label } from "../Label.types";

export type DeleteLabelDialogProps = {
  isOpen?: boolean;
  label?: Label;
  onClose?: DialogProps["onClose"];
  onDelete?: (deletedLabel: Label) => void;
};

declare const DeleteLabelDialog: React.FC<DeleteLabelDialogProps>;

export { DeleteLabelDialog };
