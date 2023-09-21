import type { Label } from "../../LabelSelector/Label.types";

export type LabelFilterProps = {
  label?: string;
  name?: string;
  onChange?: (value: Label[]) => void;
  options: Label[];
  value?: Label[];
  variant?: "popper" | "always-open";
};

declare const LabelFilter: React.FC<LabelFilterProps>;

export default LabelFilter;