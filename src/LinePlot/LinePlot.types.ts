/**
 * This type defines the props for the LinePlot component.
 */
export type LinePlotProps = {
  /**
   *  Title of the dialog when in fullscreen mode. No plot title is shown when in fullscreen mode, only the dialog title if set.
   */
  fullscreenTitle?: string;
  /**
   * Boolean that determines whether or not the plot is static.
   */
  isStatic?: boolean;
  /**
   * Boolean that determines whether or not the grid is shown.
   */
  showGrid?: boolean;
  /**
   * Boolean that determines whether or not the marker points are shown.
   */
  showMarkers?: boolean;
  /**
   *  Title of the plot. This is not shown when in fullscreen mode, even if set.
   */
  title?: string;
  /**
   * Legend name for the first plot.
   */
  legendNameFirst?: string;
  /**
   * Legend name for the second plot.
   */
  legendNameSecond?: string;
  /**
   * Arrays of numbers that represent the X coordinates of the points to be plotted.
   */
  xdata: number[];
  /**
   * Arrays of numbers that represent the second X coordinates of the points to be plotted.
   */
  xdataSecond?: number[];
  /**
   * Label for the X axis.
   */
  xlabel: string;
  /**
   * Arrays of numbers that represent the Y coordinates of the points to be plotted.
   */
  ydata: number[];
  /**
   * Arrays of numbers that represent the second Y coordinates of the points to be plotted.
   */
  ydataSecond?: number[];
  /**
   * Label for the Y axis.
   */
  ylabel: string;
};

/**
 * This type defines the props for the Config component.
 */
export type ConfigProps = {
  /**
   * Boolean that determines whether or not the fullscreen button is shown.
   */
  isFullscreen: boolean;
  /**
   * Function that handles the click event on the fullscreen button.
   */
  handleClickFullscreen: () => void;
  /**
   * Boolean that determines whether or not the plot is static.
   */
  isStatic: boolean;
};

/**
 * This type defines the props for the ConditionalDialog component.
 */
export type ConditionalDialogProps = {
  /**
   * Boolean that determines whether or not the dialog is open.
   */
  condition: boolean;
  /**
   * Function that handles the close event of the dialog.
   */
  onClose: () => void;
  /**
   * Children of the dialog.
   */
  children: React.ReactNode;
  /**
   * Title of the dialog.
   */
  dialogTitle?: string;
};
