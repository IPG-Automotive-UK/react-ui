import FontPicker from "./FontPicker";

export type FontPickerProps = {
  disabled?: boolean;
  error?: boolean;
  label?: string;
  margin?: "none" | "dense" | "normal";
  onChange?: (event: React.ChangeEvent) => void;
  options?: string[];
  required?: boolean;
  value?: string | number;
  variant?: "standard" | "outlined" | "filled";
};

export default FontPicker as React.FC<FontPickerProps>;
