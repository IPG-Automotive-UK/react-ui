import Checkbox from "./Checkbox";

export type CheckboxProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  label?: string;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  size?: "small" | "medium";
  style?: React.CSSProperties;
};

export default Checkbox as React.FC<CheckboxProps>;
