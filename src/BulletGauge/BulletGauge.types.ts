/**
 * This type defines the props for the BulletGauge component.
 */
export type BulletGaugeProps = {
  /**
   * The value to be displayed on the gauge. The maximum value is 100. The color of the gauge changes based on this value:
   * - Less than 30: Red
   * - Between 30 and 70: Orange
   * - Greater than 70: Green
   */
  value: number;
  /**
   * Title of the plot
   */
  title?: string;
  /**
   * The suffix to be displayed after the value.
   */
  suffix?: string;
};
