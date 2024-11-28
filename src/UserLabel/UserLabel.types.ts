import { IconWithLabelProps } from "../IconWithLabel";

/**
 * Prop type for a `UserLabel` component
 */
export type UserLabelProps = Pick<IconWithLabelProps, "label"> & {
  /**
   * The color of the background of the user avatar
   */
  color?: string;
};
