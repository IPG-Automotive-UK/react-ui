import { CSSProperties } from "react";
import { Status } from "../statuses.types";

export type StatusIconProps = {
  /**
   * Icon height
   */
  height?: CSSProperties["height"];
  /**
   * Icon width
   */
  width?: CSSProperties["width"];
  /**
   * Icon padding
   */
  padding?: CSSProperties["padding"];
  /**
   *
   * The status type.
   */
  status: Status;
  /**
   * Tooltip text to display on hover of the icon
   */
  iconTooltipText?: string;
};
