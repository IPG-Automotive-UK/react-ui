import { ChipProps } from "@mui/material";

export type LabelChipProps = Omit<ChipProps, "color" | "label"> & {
  /**
   * The color of the chip.
   */
  color?: string;
  /**
   * The description to show in Tooltip.
   */
  description?: string;
  /**
   * The label content of the chip.
   */
  label: string;
  /**
   * Selected state of the chip
   */
  selected?: boolean;
  /**
   * The visibility of the chip.
   */
  visible?: boolean;
};
