import { Meta } from "@storybook/react";
import { VirtoBadge } from "./VirtoBadge";

/**
 * Story metadata
 */
const meta: Meta<typeof VirtoBadge> = {
  component: VirtoBadge,
  title: "General/SvgIcons/VirtoBadge"
};
export default meta;

/**
 * Story showing the default colour behaviour syncs with the current colour mode
 */
export const Default = {
  args: {
    sx: { height: 100, width: 100 }
  },
  render: VirtoBadge
};
