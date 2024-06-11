import { BreadcrumbsProps as MuiBreadcrumbsProps } from "@mui/material";
import { PropsWithChildren } from "react";

/**
 * Breadcrumbs component props
 */
export type BreadcrumbsProps = PropsWithChildren<
  Omit<MuiBreadcrumbsProps, "sx" | "className" | "classes">
>;
