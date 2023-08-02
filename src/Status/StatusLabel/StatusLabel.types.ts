export interface StatusLabelProps {
  /**
   * Icon height
   */
  height?: number;
  /**
   * Icon width
   */
  width?: number;
  /**
   *
   * The status type.
   */
  status:
    | "Passed"
    | "Failed"
    | "Not Run"
    | "Pending"
    | "cancelled"
    | "completed"
    | "failed"
    | "not-ready"
    | "ready"
    | "running"
    | "submitted";
  /**
   * The Variant type.
   */
  variant?:
    | "body1"
    | "body2"
    | "caption"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "inherit"
    | "subtitle1"
    | "subtitle2";
}
