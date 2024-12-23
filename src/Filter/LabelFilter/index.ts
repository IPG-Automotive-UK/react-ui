import type { Label } from "../../LabelSelector/Label.types";
import LabelFilter from "./LabelFilter";

export type LabelFilterProps = {
  label?: string;
  limitTags?: number;
  name?: string;
  onChange?: (value: Label[]) => void;
  options: Label[];
  value?: Label[];
};

export default LabelFilter as React.FC<LabelFilterProps>;
