import { Meta } from "@storybook/react";
import VirtoAppHeader from ".";
import { fixedPositionComponentDecorator } from "../../.storybook/decorators";

/**
 * Story metadata
 */
const meta: Meta<typeof VirtoAppHeader> = {
  component: VirtoAppHeader,
  decorators: [fixedPositionComponentDecorator({ minHeight: 58 })],
  title: "Layout/VirtoAppHeader"
};
export default meta;
export const Default = {
  args: {
    appName: "APP NAME",
    baseUrl: "http://localhost:3000",
    username: "Ruud van Nistelrooy"
  },

  render: VirtoAppHeader
};
