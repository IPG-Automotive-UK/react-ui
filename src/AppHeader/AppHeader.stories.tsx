import { Meta, Story } from "@storybook/react";

import AppHeader from ".";
import { AppHeaderProps } from "./AppHeader.types";
import React from "react";
import { action } from "@storybook/addon-actions";

/**
 * Story metadata
 */
const meta: Meta<typeof AppHeader> = {
  component: AppHeader,
  title: "Layout/AppHeader"
};
export default meta;

const Template: Story<AppHeaderProps> = args => {
  const [mode, setMode] = React.useState<"light" | "dark" | undefined>("light");
  React.useEffect(() => {
    setMode(args.mode);
  }, [args.mode]);
  return (
    <AppHeader
      {...args}
      mode={mode}
      onMenuClick={action("onMenuClick")}
      onModeChange={newMode => {
        setMode(newMode);
        action("onChange")(newMode);
      }}
    />
  );
};

// default story
export const Default = Template.bind({});
Default.args = {
  appName: "APP NAME",
  baseUrl: "http://localhost:3000",
  mode: "light",
  username: "Ruud van Nistelrooy"
};
