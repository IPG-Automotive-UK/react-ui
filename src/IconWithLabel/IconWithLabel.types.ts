import type { ReactElement } from "react";

/**
 * The input type for an IconWithLabel component
 */
export type IconWithLabelProps = {
  /**
   * A React Element that is an icon to be rendered
   */
  icon: ReactElement;
  /**
   * The label that will be rendered to the right of the icon
   */
  label: string;
  /**
   * The url to which the user will be navigated in a new tab to on clicking the label
   */
  href?: string;
  /**
   * The tooltip showing additional text on icon hover
   */
  tooltip?: string;
};
