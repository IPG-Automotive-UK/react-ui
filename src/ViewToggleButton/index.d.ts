import type { ToggleButtonGroupProps } from "@mui/material";

export type ViewToggleButtonProps = {
  disabled?: boolean;
  onChange: ToggleButtonGroupProps["onChange"];
  size?: "small" | "medium" | "large";
  value: "card" | "table";
};

declare const ViewToggleButton: React.FC<ViewToggleButtonProps>;

export default ViewToggleButton;
