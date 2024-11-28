import { SxProps, Theme } from "@mui/material";

import { Label } from "../LabelSelector/Label.types";

/**
 * Type of user
 */
type User = {
  /**
   * The name of the user
   */
  name: string;
  /**
   * The background color of the user avatar
   */
  color?: string;
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
  file: string;
  /**
   * Date of creation of road
   */
  createdAt?: string;
  /**
   * User name of the creator
   */
  user?: User;
  /**
   * Label/s which are set to this road
   */
  label?: Label[];
  /**
   * Additional styles to apply for the road preview wrapper
   */
  sx?: SxProps<Theme>;
};
