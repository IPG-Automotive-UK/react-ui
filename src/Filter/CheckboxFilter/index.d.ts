export type CheckboxFilterProps = {
  label?: string;
  limitTags?: number;
  name?: string;
  onChange?: (value: string[]) => void;
  options: string[];
  value?: string[];
  variant?: "popper" | "always-open";
};

declare const CheckboxFilter: React.FC<CheckboxFilterProps>;

export default CheckboxFilter;
