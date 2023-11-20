import type { Label } from "../../LabelSelector/Label.types";
import LabelFilter from "./LabelFilter";

export type LabelFilterProps = {
  label?: string;
  name?: string;
  onChange?: (value: Label[]) => void;
  options: Label[];
  value?: Label[];
  variant?: "popper" | "always-open";
};

export default LabelFilter as React.FC<LabelFilterProps>;
