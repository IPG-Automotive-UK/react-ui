import { ChipProps } from "@mui/material";

export type LabelChipProps = Omit<ChipProps, "color" | "label"> & {
  /**
   * The color of the chip.
   */
  color?: string;
  /**
   * The label content of the chip.
   */
  label: string;
  /**
   * The visibility of the chip.
   */
  visible?: boolean;
};
