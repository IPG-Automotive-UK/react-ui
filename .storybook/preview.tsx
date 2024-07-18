import "./styles.css";

import { DARK_MODE_EVENT_NAME } from "storybook-dark-mode";
import { DocsContainer } from "@storybook/addon-docs";
import React from "react";
import { addons } from "@storybook/preview-api";
import { store } from "storybook-dark-mode/src/Tool";
import { themeProviderDecorator } from "./decorators";
import { themes } from "@storybook/theming";

export const decorators = [themeProviderDecorator];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: { disable: true },
  controls: {
    expanded: true, // Adds the description and default columns
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    },
    sort: "alpha"
  },
  darkMode: {
    dark: { ...themes.dark },
    light: { ...themes.light },
    stylePreview: true
  },
  docs: {
    container: props => {
      const [isDark, setDark] = React.useState(store().current === "dark");

      React.useEffect(() => {
        const channel = addons.getChannel();
        channel.on(DARK_MODE_EVENT_NAME, setDark);
        return () => channel.removeListener(DARK_MODE_EVENT_NAME, setDark);
      }, [setDark]);

      return (
        <DocsContainer {...props} theme={isDark ? themes.dark : themes.light} />
      );
    }
  }
};
