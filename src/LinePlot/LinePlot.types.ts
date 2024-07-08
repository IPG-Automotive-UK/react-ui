/**
 * This type defines the props for the LinePlot component.
 */
export type LinePlotProps = {
  /**
   * Boolean that determines whether or not the grid is shown.
   */
  showGrid?: boolean;
  /**
   * Boolean that determines whether or not the marker points are shown.
   */
  showMarkers?: boolean;
  /**
   *  Title of the plot
   */
  title?: string;
  /**
   * Arrays of numbers that represent the X coordinates of the points to be plotted.
   */
  xdata: number[];
  /**
   * Label for the X axis.
   */
  xlabel: string;
  /**
   * Arrays of numbers that represent the Y coordinates of the points to be plotted.
   */
  ydata: number[];
  /**
   * Label for the Y axis.
   */
  ylabel: string;
};
