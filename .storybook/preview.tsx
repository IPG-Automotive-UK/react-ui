import { Decorator } from "@storybook/react";
import { DocsContainer } from "./DocsContainer";
import React from "react";
import ThemeProvider from "../src/ThemeProvider/ThemeProvider";
import { useDarkMode } from "storybook-dark-mode";

export const decorators: Decorator[] = [
  renderStory => {
    const isDark = useDarkMode();
    return (
      <ThemeProvider theme={isDark ? "dark" : "light"}>
        {renderStory()}
      </ThemeProvider>
    );
  }
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    },
    sort: "alpha"
  },
  darkMode: {
    stylePreview: true
  },

  docs: {
    container: DocsContainer
  }
};
