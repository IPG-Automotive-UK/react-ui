import { Meta, StoryFn } from "@storybook/react";

import React from "react";
import VirtoAppHeader from ".";
import { VirtoAppHeaderProps } from "./VirtoAppHeader.types";
import { action } from "@storybook/addon-actions";
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

const Template: StoryFn<VirtoAppHeaderProps> = args => {
  const [mode, setMode] = React.useState<"light" | "dark" | undefined>("light");
  React.useEffect(() => {
    setMode(args.mode);
  }, [args.mode]);
  return (
    <VirtoAppHeader
      {...args}
      mode={mode}
      onMenuClick={action("onMenuClick")}
      onColourModeChange={newMode => {
        setMode(newMode);
        action("onChange")(newMode);
      }}
    />
  );
};

export const Default = {
  args: {
    appName: "APP NAME",
    baseUrl: "http://localhost:3000",
    mode: "light",
    username: "Ruud van Nistelrooy"
  },

  render: Template
};
