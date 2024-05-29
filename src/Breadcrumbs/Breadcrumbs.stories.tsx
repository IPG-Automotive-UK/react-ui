import { Meta, StoryFn, StoryObj } from "@storybook/react";
import Breadcrumbs from "./Breadcrumbs";
import { BreadcrumbsProps } from "./Breadcrumbs.types";
import { Link } from "@mui/material";
import React from "react";

type Story = StoryObj<typeof Breadcrumbs>;

export default {
  component: Breadcrumbs,
  title: "General/Breadcrumbs"
} satisfies Meta<typeof Breadcrumbs>;

export const Default: StoryFn<BreadcrumbsProps> = args => {
  return (
    <Breadcrumbs {...args}>
      <Link href="">Home</Link>
      <Link href="">Garden</Link>
      <Link href="">Shops</Link>
    </Breadcrumbs>
  );
};

const TemplateWithBreadcrumbProps: StoryFn<BreadcrumbsProps> = args => {
  return <Breadcrumbs {...args} />;
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
