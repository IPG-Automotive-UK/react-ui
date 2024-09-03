/**
 * The props needed to define a road preview
 */
export type RoadPreviewProps = {
  /**
   * The name of the road
   */
  name: string;
  /**
   * The link for opening current road
   */
  href: string;
  /**
   * Version of the road
   */
  version: number;
  /**
   * Image of the current road
   */
  image: string;
  /**
   * Description of the road
   */
  description: string;
  /**
   * Format of the road
   */
  format: string;
  /**
   * Format version of the road
   */
  formatVersion: number;
  /**
   * Name of the road file
   */
  file: string;
  /**
   * Date of creation of road
   */
  createdAt?: Date;
  /**
   * User name of the creator
   */
  user?: string;
  /**
   * Label/s which are set to this road
   */
  label?: string[];
};
