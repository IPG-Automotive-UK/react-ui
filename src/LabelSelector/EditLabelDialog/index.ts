import type { DialogProps } from "@mui/material/Dialog";
import type { Label } from "../Label.types";

export type EditLabelDialogProps = {
  isOpen?: boolean;
  label?: Label;
  labelDialogTitle?: string;
  onClose?: DialogProps["onClose"];
  onEdit?: (editedLabel: Label) => void;
  onNew?: (newLabel: Label) => void;
  options?: Label[];
};

declare const EditLabelDialog: React.FC<EditLabelDialogProps>;

export { EditLabelDialog };
