/**
 * This type defines the props for the LinePlot component.
 */
export type LinePlotProps = {
  /**
   *  Title of the dialog when in fullscreen mode. No plot title is shown when in fullscreen mode, only the dialog title if set.
   */
  fullscreenTitle?: string;
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

/**
 * This type defines the props for the Config component.
 */
export type ConfigProps = {
  isFullscreen: boolean;
  handleClickFullscreen: () => void;
};

/**
 * This type defines the props for the ConditionalDialog component.
 */
export type ConditionalDialogProps = {
  condition: boolean;
  onClose: () => void;
  children: React.ReactNode;
  dialogTitle?: string;
};
