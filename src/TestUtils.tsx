/**
 * Provides a custom render function for React Testing Library that wraps
 * every component in the app’s ThemeProvider. By using this helper:
 *   1. All components under test get the same theme configuration
 *      (including CSS variables, color schemes, and custom overrides)
 *      as in the real application.
 *   2. References to `theme.vars` or the `useColorScheme` hook will never
 *      be undefined, preventing runtime errors in tests.
 */

import { RenderOptions, render as rtlRender } from "@testing-library/react";

import React from "react";
import ThemeProvider from "./ThemeProvider";

/**
 * AllProviders
 *
 * Wraps its children in the app’s ThemeProvider so that
 * the full theme (with CSS variables enabled) is available
 * to any component under test.
 *
 * @param children - The React nodes to render inside the provider.
 */
function AllProviders({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

/**
 * A drop-in replacement for RTL’s `render` that automatically
 * wraps the UI in AllProviders.
 */
function render(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) {
  return rtlRender(ui, { wrapper: AllProviders, ...options });
}

// re-export everything else from React Testing Library
export * from "@testing-library/react";
export { render };
