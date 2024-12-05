import { SxProps, Theme } from "@mui/material";

import { Label } from "../LabelSelector/Label.types";

/**
 * Type of user associated with the scenario
 */
export type User = {
  /**
   * Name of the user
   */
  name: string;
  /**
   * Optional color for the user's avatar
   */
  color?: string;
};

/**
 * The props needed to define a scenario preview
 */
export type ScenarioPreviewProps = {
  /**
   * Name of the scenario
   */
  name: string;
  /**
   * Link to open the current scenario
   */
  href: string;
  /**
   * Image URL of the scenario
   */
  image: string;
  /**
   * Description of the scenario
   */
  description: string;
  /**
   * Format of the scenario (e.g., ASAM OpenDRIVE)
   */
  format: string;
  /**
   * Format version of the scenario
   */
  formatVersion: string;
  /**
   * File object representing the scenario file
   */
  file: string;
  /**
   * Date of creation of the scenario in ISO-8601 format
   */
  createdAt?: string;
  /**
   * Optional user who created the scenario
   */
  user?: User;
  /**
   * Optional labels associated with the scenario
   */
  label?: Label[];
  /**
   * Name for the road
   */
  roadName: string;
  /**
   * Link to open the current road
   */
  roadHref: string;
  /**
   * Additional styles to apply to the scenario preview wrapper
   */
  sx?: SxProps<Theme>;
};
