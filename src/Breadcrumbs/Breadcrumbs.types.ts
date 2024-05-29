import { BreadcrumbsProps as MuiBreadcrumbsProps } from "@mui/material";
import { PropsWithChildren } from "react";

export type BreadcrumbsProps = PropsWithChildren<
  Omit<MuiBreadcrumbsProps, "sx"> & {
    breadcrumbs?: { to: string; label: string }[];
    component?: React.ElementType;
  }
>;
