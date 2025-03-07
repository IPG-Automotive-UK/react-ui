import { Meta } from "@storybook/react";
import { VirtoLogo } from "./VirtoLogo";

/**
 * Story metadata
 */
const meta: Meta<typeof VirtoLogo> = {
  component: VirtoLogo,
  title: "General/SvgIcons/VirtoLogo"
};
export default meta;

/**
 * Story showing the default colour behaviour syncs with the current colour mode
 */
export const Default = {
  args: {
    sx: { height: 40, width: 160 }
  },
  render: VirtoLogo
};

/**
 * Story showing that colours can be overridden
 */
export const CustomColour = {
  args: {
    sx: {
      color: "#fd216a",
      height: 40,
      width: 160
    }
  },
  render: VirtoLogo
};
