// Surface3D.types.ts

export type SurfacePlotProps = {
  /*
      markers is a boolean that determines whether or not the points are marked.
    */
  markers?: boolean;
  /*
      showTitle is a boolean that determines whether or not the title is shown on the main view.
    */
  showTitle?: boolean;
  /*
      Title of the plot.
    */
  title?: string;
  /*
      Arrays of numbers that represent the X coordinates of the points to be plotted.
    */
  xdata: number[];
  /*
      Label for the X axis.
    */
  xlabel: string;
  /*
      Arrays of numbers that represent the Y coordinates of the points to be plotted.
    */
  ydata: number[];
  /*
      Label for the Y axis.
    */
  ylabel: string;
  /*
      2D array of numbers that represent the Z coordinates of the points to be plotted.
    */
  zdata: number[][];
  /*
      Label for the Z axis.
    */
  zlabel: string;
};
