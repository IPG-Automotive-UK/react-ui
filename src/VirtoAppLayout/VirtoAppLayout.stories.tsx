import { Meta, StoryFn } from "@storybook/react";
import {
  Default as SidebarItemDefault,
  Disabled as SidebarItemDisabled,
  Nested as SidebarItemNested,
  Selected as SidebarItemSelected,
  WithCount as SidebarItemWithCount
} from "../Sidebar/SidebarItem/SidebarItem.stories";

import React from "react";
import SidebarDivider from "../Sidebar/SidebarDivider";
import SidebarItem from "../Sidebar/SidebarItem";
import VirtoAppLayout from ".";
import { VirtoAppLayoutProps } from "./VirtoAppLayout.types";
import { fixedPositionComponentDecorator } from "../../.storybook/decorators";
import { version } from "../../package.json";

/**
 * Story metadata
 */
const meta: Meta<typeof VirtoAppLayout> = {
  component: VirtoAppLayout,
  decorators: [
    fixedPositionComponentDecorator({
      height: "100vh",
      width: "100vw"
    })
  ],
  title: "Layout/VirtoAppLayout"
};
export default meta;

const Template: StoryFn<VirtoAppLayoutProps> = args => {
  return <VirtoAppLayout {...args} />;
};

export const Default = {
  args: {
    appName: "APP NAME",
    appVersion: version,
    baseUrl: "http://localhost:3000",
    /**
     * Content set to something that forces the content to be scrollable
     */
    content: (
      <div
        style={{
          height: "110vw",
          padding: "16px",
          width: "110vw"
        }}
      >
        App Content goes here
      </div>
    ),
    mode: "light",
    sidebarContent: (
      <>
        <SidebarItem {...SidebarItemSelected.args} />
        <SidebarItem {...SidebarItemDefault.args} />
        <SidebarDivider />
        <SidebarItem {...SidebarItemDisabled.args} />
        <SidebarItem {...SidebarItemWithCount.args} />
        <SidebarDivider />
        <SidebarItem {...SidebarItemNested.args} />
      </>
    ),
    username: "Ruud van Nistelrooy"
  },

  parameters: {
    layout: "fullscreen" // removes the padding from the story iframe for this story
  },

  render: Template
};
