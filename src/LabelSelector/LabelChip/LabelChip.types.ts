import { ChipProps } from "@mui/material";

export interface LabelChipProps extends Omit<ChipProps, "color" | "label"> {
  color?: string;
  label: string;
}
