import AppHeader from "../AppHeader";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  component: AppHeader,
  title: "Layout/AppHeader"
};

const Template = args => {
  const [mode, setMode] = React.useState("light");
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
  appUrls: [
    {
      "VIRTO.BUILD": "https://someurl.com",
      "VIRTO.DATA": "https://someurl.com",
      "VIRTO.FLEET": "https://someurl.com",
      "VIRTO.ID": "https://someurl.com"
    }
  ],
  mode: "light",
  username: "Ruud van Nistelrooy"
};
