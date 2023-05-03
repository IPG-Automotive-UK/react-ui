import React from "react";
import ThemeContext from "./ThemeContext";

/**
 * Hook to control theme from within a theme provider
 */
export default function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error(`useTheme must be used within a ThemeProvider`);
  }
  return context;
}
