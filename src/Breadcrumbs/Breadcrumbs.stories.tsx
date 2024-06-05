import { Link, Typography } from "@mui/material";
import { Meta, StoryFn } from "@storybook/react";
import Breadcrumbs from "./Breadcrumbs";
import { BreadcrumbsProps } from "./Breadcrumbs.types";
import React from "react";

export default {
  component: Breadcrumbs,
  title: "General/Breadcrumbs"
} satisfies Meta<typeof Breadcrumbs>;

export const Default: StoryFn<BreadcrumbsProps> = args => {
  return (
    <Breadcrumbs>
      <Link href="">Home</Link>
      <Link href="">Garden</Link>
      <Typography>Shops</Typography>
    </Breadcrumbs>
  );
};
