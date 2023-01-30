import { DARK_MODE_EVENT_NAME } from "storybook-dark-mode";
import React from "react";
import ThemeProvider from "../src/ThemeProvider/ThemeProvider";
import { addDecorator } from "@storybook/react";
import addons from "@storybook/addons";

// get channel to listen to event emitter
const channel = addons.getChannel();

addDecorator(story => {
  // this example uses hook but you can also use class component as well
  const [isDark, setDark] = React.useState(
    () => localStorage.getItem("sb-addon-themes-3" || false) // default to the storybook-dark-mode local storage key
  );

  React.useEffect(() => {
    // listen to DARK_MODE event
    channel.on(DARK_MODE_EVENT_NAME, setDark);
    return () => channel.off(DARK_MODE_EVENT_NAME, setDark);
  }, [channel, setDark]);

  return (
    <ThemeProvider theme={isDark ? "dark" : "light"}>{story()}</ThemeProvider>
  );
});

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    },
    sort: "alpha"
  }
};
