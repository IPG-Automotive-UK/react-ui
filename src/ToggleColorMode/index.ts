import ToggleColorMode from "./ToggleColorMode";

export type ToggleColorModeProps = {
  mode?: "light" | "dark" | "system";
  onChange: (mode: "light" | "dark") => void;
};

export default ToggleColorMode as React.FC<ToggleColorModeProps>;
