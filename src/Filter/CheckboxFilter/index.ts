import CheckboxFilter from "./CheckboxFilter";

export type CheckboxFilterProps = {
  label?: string;
  limitTags?: number;
  name?: string;
  onChange?: (value: string[]) => void;
  options: string[];
  value?: string[];
  variant?: "popper" | "always-open";
};

export default CheckboxFilter as React.FC<CheckboxFilterProps>;
