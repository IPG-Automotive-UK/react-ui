export type File = {
  /**
   * Unique identifier of the file
   */
  _id: string;
  /**
   * Name of the file
   */
  name: string;
  /**
   * Type of the file e.g. road, scenario, roadInfographic etc.
   */
  type: string;
  /**
   * Path to the file on file-service. This is an internal only field and should not be exposed to the client.
   */
  path?: string;
};

export type Label = {
  _id: string;
  name: string;
  description: string;
  color: string;
  createdAt: string;
  updatedAt: string;
};

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
  version: string;
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
  formatVersion: string;
  /**
   * Name of the road file
   */
  file: File;
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
  label?: Label[];
};
