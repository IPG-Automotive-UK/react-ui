import { PropsWithChildren } from "react";
import { SxProps } from "@mui/material";

/**
 * Props for the LazyLoadImg component
 */
export type LazyLoadProps = PropsWithChildren<{
  /**
   * Styles for the container
   */
  sx?: SxProps;
}>;
