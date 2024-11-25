import type { ReactElement } from "react";

/**
 * The input type for an IconWithLabel component
 */
export type IconWithLabelProps = {
  icon: ReactElement;
  label: string;
  href?: string;
};
