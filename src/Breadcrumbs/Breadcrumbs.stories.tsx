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
    <Breadcrumbs {...args}>
      <Link href="">Home</Link>
      <Link href="">Garden</Link>
      <Typography>Shops</Typography>
    </Breadcrumbs>
  );
};

export const OverflowEllipses: StoryFn<BreadcrumbsProps> = args => {
  return (
    <Breadcrumbs {...args}>
      <Link href="">Item 1</Link>
      <Link href="">Item 2</Link>
      <Link href="">Talent is just a pursued interest</Link>
      <Link href="">Anybody can do what I do</Link>
      <Typography>
        Just go back and put one little more happy tree in there Just go back
        and put one little more happy tree in there
      </Typography>
    </Breadcrumbs>
  );
};
