export type CheckboxProps = {
  checked?: boolean;
  disabled?: boolean;
  label?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  size?: "small" | "medium";
  style?: React.CSSProperties;
};

declare const Checkbox: React.FC<CheckboxProps>;

export default Checkbox;
