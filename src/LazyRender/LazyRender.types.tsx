import { PropsWithChildren, ReactNode } from "react";

import { SxProps } from "@mui/material";

/**
 * Props for the LazyLoadImg component
 */
export type LazyRenderProps = PropsWithChildren<{
  /**
   * Styles for the container
   */
  sx?: SxProps;

  /**
   * Optional fallback to display while not in view
   */
  fallback?: ReactNode;
}>;
