import { Status } from "../statuses.types";
import { TypographyVariant } from "@mui/material";

export type StatusCardProps = {
  /**
   * The status type.
   */
  status: Status;
  /**
   * The status message.
   */
  name: string;
  /**
   * Tooltip text to display on hover of the icon
   */
  iconTooltipText?: string;
  /**
   * The variant of the title
   */
  titleVariant?: TypographyVariant;
};
