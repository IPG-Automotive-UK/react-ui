import "./styles.css";

import { DARK_MODE_EVENT_NAME } from "storybook-dark-mode";
import { DocsContainer } from "@storybook/addon-docs";
import React from "react";
import { addons } from "@storybook/preview-api";
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
      const [isDark, setDark] = React.useState(() => {
        // NOTE: This is a bit of a hack to get the initial value of dark mode from localStorage. It relies on the internal implementation of the storybook-dark-mode addon. This is because the exposed useDarkMode hook cannot be used in a decorator like this. https://github.com/hipstersmoothie/storybook-dark-mode/issues/282
        const storedItem = window.localStorage.getItem("sb-addon-themes-3");
        const stored = JSON.parse(storedItem!);
        return stored.current === "dark";
      });

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
export const tags = ["autodocs"];
