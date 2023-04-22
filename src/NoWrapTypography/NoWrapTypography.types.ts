export interface NoWrapTypographyProps {
  /**
   * The content of the component.
   */
  children: React.ReactNode;
  /**
   * The CSS styles applied to the component.
   */
  // define react type for sx
  sx?: Record<string, any>;
  /**
   * The variant to use.
   */
  variant?:
    | "body1"
    | "body2"
    | "button"
    | "caption"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "inherit"
    | "overline"
    | "subtitle1"
    | "subtitle2";
}
