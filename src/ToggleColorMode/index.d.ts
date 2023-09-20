export type ToggleColorModeProps = {
  mode?: "light" | "dark";
  onChange: (mode: "light" | "dark") => void;
};

declare const ToggleColorMode: React.FC<ToggleColorModeProps>;

export default ToggleColorMode;
