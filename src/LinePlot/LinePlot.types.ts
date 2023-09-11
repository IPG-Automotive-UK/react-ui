export interface LinePlotProps {
  /*
    Arrays of numbers that represent the X coordinates of the points to be plotted.
  */
  xdata: number[];
  /*
    Arrays of numbers that represent the Y coordinates of the points to be plotted.
  */
  ydata: number[];
  /*
    Label for the X axis.
  */
  xlabel: string;
  /*
    Label for the Y axis.
  */
  ylabel: string;
  /*
    Title of the plot
  */
  title?: string;
  /*
    showTitle is a boolean that determines whether or not the title is shown.
  */
  showTitle?: boolean;
  /*
    markers is a boolean that determines whether or not the points are marked.
  */
  markers?: boolean;
}
