import React from "react";
import ThemeProvider from "../src/ThemeProvider/ThemeProvider";
import { addDecorator } from "@storybook/react";
import { useDarkMode } from "storybook-dark-mode";

addDecorator(story => {
  // state for whether storybook. storybook-dark-mode persists this in local storage
  const isDark = useDarkMode();

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
