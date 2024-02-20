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
   *
   * The status type.
   */
  status: Status;
};
