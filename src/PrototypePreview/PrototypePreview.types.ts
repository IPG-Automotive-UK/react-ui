import { SxProps, Theme } from "@mui/material";

import { Label } from "../Common.types";

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
 * The props needed to define a prototype preview
 */

export type PrototypePreviewProps = {
  /**
   * The name of the prototype
   */
  name: string;
  /**
   * The link for opening current prototype
   */
  href: string;
  /**
   * Image of the current prototype
   */
  image: string;
  /**
   * Description of the prototype
   */
  description: string;
  /**
   * Format of the prototype
   */
  format: string;
  /**
   * Format version of the prototype
   */
  formatVersion: string;
  /**
   * The version of the prototype
   */
  prototypeVersion: string;
  /**
   * The quality of the prototype
   */
  quality: "not-run" | "passed" | "errored";
  /**
   * Date of creation of prototype
   */
  createdAt?: string;
  /**
   * User object of the creator of the prototype
   */
  user?: User;
  /**
   * Label/s which are set to this prototype
   */
  label?: Label[];
  /**
   * Additional styles to apply for the prototype preview wrapper
   */
  sx?: SxProps<Theme>;
};
