import { SxProps, Theme } from "@mui/material";

import { Label } from "../LabelSelector/Label.types";

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

/**
 * The props needed to define a scenario preview
 */
export type ScenarioPreviewProps = {
  /**
   * The name of the scenario
   */
  name: string;
  /**
   * The link for opening the current scenario
   */
  href: string;
  /**
   * Image of the current scenario
   */
  image: string;
  /**
   * Description of the scenario
   */
  description: string;
  /**
   * Format of the scenario
   */
  format: string;
  /**
   * Format version of the scenario
   */
  formatVersion: string;
  /**
   * Name of the scenario file
   */
  file: File;
  /**
   * Date of creation of the scenario
   */
  createdAt?: string;
  /**
   * User name of the creator
   */
  user?: string;
  /**
   * Label/s which are set to this scenario
   */
  label?: Label[];
  /**
   * Additional styles to apply for the scenario preview wrapper
   */
  sx?: SxProps<Theme>;
};
