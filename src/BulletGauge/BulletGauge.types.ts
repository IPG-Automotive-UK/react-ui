/**
 * This type defines the props for the BulletGauge component.
 */
export type BulletGaugeProps = {
  /*
    The value to be displayed on the gauge.
  */
  value: number;
  /*
    Title of the plot
  */
  title?: string;
  /*
    The suffix to be displayed after the value.
  */
  suffix?: string;
};
