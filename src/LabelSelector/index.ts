import { BaseSyntheticEvent } from "react";
import type { Label } from "./Label.types";
import LabelSelector from "./LabelSelector";
export { default as LabelChip, type LabelChipProps } from "./LabelChip";
export {
  default as LabelChipGroup,
  type LabelChipGroupProps
} from "./LabelChipGroup";

export type LabelSelectorProps = {
  addEnabled?: boolean;
  autocompleteLabel?: string;
  deleteEnabled?: boolean;
  editEnabled?: boolean;
  error?: boolean;
  helperText?: string;
  limitTags?: number;
  multiple?: boolean;
  name?: string;
  nameMaxLength?: number;
  onBlur?: (event: BaseSyntheticEvent) => void;
  onChange?: (selectedLabels: Label[]) => void;
  onDelete?: (deletedLabel: Label) => void;
  onEdit?: (editedLabel: Label) => void;
  onNew?: (newLabel: Label) => void;
  options: Label[];
  size?: "small" | "medium";
  value?: Label[];
};

export default LabelSelector as React.FC<LabelSelectorProps>;
