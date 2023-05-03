import { ChipProps } from "@mui/material";

export interface LabelChipProps extends Omit<ChipProps, "color" | "label"> {
  /**
   * The color of the chip.
   */
  color?: string;
  /**
   * The label content of the chip.
   */
  label: string;
}
