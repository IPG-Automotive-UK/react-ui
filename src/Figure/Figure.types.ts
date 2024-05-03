export type FigureProps = {
  /**
   * The path/url to the image
   */
  url: string;
  /**
   * The x position of the image
   */
  x: number;
  /**
   * The y position of the image
   */
  y: number;
  /**
   * A rotation angle in degrees
   */
  angle?: number;
  /**
   * The width of the image
   */
  width?: number;
  /**
   * The height of the image
   */
  height?: number;
  /**
   * The scale of the image, similar to size, but can't affect the aspect ratio
   */
  scale?: number;
  /**
   * Resolves on image loaded
   */
  onImageLoaded?: (loaded: boolean) => void;
};
