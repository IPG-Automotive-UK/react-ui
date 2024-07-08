/**
 * This type defines the props for the LinePlot component.
 */
export type LinePlotProps = {
  /**
   * Exponentformat is a string that determines the format for large numbers.
   */
  exponentFormat?: "none" | "e" | "E" | "power" | "SI" | "B";
  /**
   * markers is a boolean that determines whether or not the points are marked.
   */
  markers?: boolean;
  /**
   *  Minimum height of the plot.
   */
  minHeight?: number;
  /**
   * Boolean that determines whether or not the grid is shown.
   */
  showGrid?: boolean;
  /**
   *  showTitle is a boolean that determines whether or not the title is shown on main view.
   */
  showTitle?: boolean;
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
