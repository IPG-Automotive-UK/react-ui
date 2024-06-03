import { Link, Typography } from "@mui/material";
import { Meta, StoryFn, StoryObj } from "@storybook/react";
import Breadcrumbs from "./Breadcrumbs";
import { BreadcrumbsProps } from "./Breadcrumbs.types";
import React from "react";

type Story = StoryObj<typeof Breadcrumbs>;

export default {
  component: Breadcrumbs,
  title: "General/Breadcrumbs"
} satisfies Meta<typeof Breadcrumbs>;

const TemplateWithBreadcrumbProps: StoryFn<BreadcrumbsProps> = args => {
  return <Breadcrumbs {...args} />;
};

export const Default: Story = {
  args: {
    breadcrumbs: [
      { label: "Home", to: "/home" },
      { label: "Garden", to: "/home/garden" },
      { label: "Shops", to: "home/garden/shops" }
    ]
  },

  render: TemplateWithBreadcrumbProps
};

export const DefaultWithChildren: StoryFn<BreadcrumbsProps> = args => {
  return (
    <Breadcrumbs {...args}>
      <Link href="">Home</Link>
      <Link href="">Garden</Link>
      <Typography>Shops</Typography>
    </Breadcrumbs>
  );
};

export const PropsWithDefaultLinks: Story = {
  args: {
    breadcrumbs: [
      { label: "Home", to: "/home" },
      { label: "Garden", to: "/home/garden" },
      { label: "Shops", to: "home/garden/shops" }
    ]
  },

  render: TemplateWithBreadcrumbProps
};

export const PropsWithComponentOverride: Story = {
  args: {
    breadcrumbs: [
      { label: "Home", to: "/home" },
      { label: "Garden", to: "/home/garden" },
      { label: "Shops", to: "home/garden/shops" }
    ],
    component: "button"
  },

  render: TemplateWithBreadcrumbProps
};
