import React from "react";
import { addDecorator } from "@storybook/react";
import ThemeProvider from "../src/ThemeProvider/ThemeProvider";

addDecorator(story => <ThemeProvider>{story()}</ThemeProvider>);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};
