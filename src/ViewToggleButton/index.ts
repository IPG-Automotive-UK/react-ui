import type { ToggleButtonGroupProps } from "@mui/material";
import ViewToggleButton from "./ViewToggleButton";

export type ViewToggleButtonProps = {
  disabled?: boolean;
  onChange: ToggleButtonGroupProps["onChange"];
  size?: "small" | "medium" | "large";
  value: "card" | "table";
};

export default ViewToggleButton as React.FC<ViewToggleButtonProps>;
