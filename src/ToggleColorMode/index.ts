import ToggleColorMode from "./ToggleColorMode.js";

export type ToggleColorModeProps = {
  mode?: "light" | "dark";
  onChange: (mode: "light" | "dark") => void;
};

export default ToggleColorMode as React.FC<ToggleColorModeProps>;
