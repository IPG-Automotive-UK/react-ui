import { Link, Typography } from "@mui/material";
import { Meta, StoryFn, StoryObj } from "@storybook/react";
import Breadcrumbs from "./Breadcrumbs";
import { BreadcrumbsProps } from "./Breadcrumbs.types";
import React from "react";

type Story = StoryObj<typeof Breadcrumbs>;

const args = {
  breadcrumbs: [
    { label: "Home", to: "/home" },
    { label: "Garden", to: "/home/garden" },
    { label: "Shops", to: "home/garden/shops" }
  ]
};

export default {
  component: Breadcrumbs,
  title: "General/Breadcrumbs"
} satisfies Meta<typeof Breadcrumbs>;

const TemplateWithBreadcrumbProps: StoryFn<BreadcrumbsProps> = args => {
  return <Breadcrumbs {...args} />;
};

export const Default: Story = {
  args,
  render: TemplateWithBreadcrumbProps
};

export const DefaultWithChildren: StoryFn<BreadcrumbsProps> = args => {
  return (
    <Breadcrumbs>
      <Link href="">Home</Link>
      <Link href="">Garden</Link>
      <Typography>Shops</Typography>
    </Breadcrumbs>
  );
};

export const PropsWithComponentOverride: Story = {
  args: {
    ...args,
    component: "button"
  },

  render: TemplateWithBreadcrumbProps
};
