import Checkbox from "./Checkbox";

export type CheckboxProps = {
  checked?: boolean;
  disabled?: boolean;
  label?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  size?: "small" | "medium";
  style?: React.CSSProperties;
};

export default Checkbox as React.FC<CheckboxProps>;
