import { ChipProps } from "@mui/material";

export type LabelChipProps = Omit<ChipProps, "color" | "label"> & {
  /**
   * The color of the chip.
   */
  color?: string;
  /**
   * The description to show in Tootip.
   */
  description?: string;
  /**
   * The label content of the chip.
   */
  label: string;
  /**
   * Whether the selected icon should be displayed.
   */
  selected?: boolean;
  /**
   * The visibility of the chip.
   */
  visible?: boolean;
};
