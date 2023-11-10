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

declare const FontPicker: React.FC<FontPickerProps>;

export default FontPicker;
