import { Theme } from "@mui/material/styles";

export type ThemeProviderProps = {
  /**
   * The appearance of the theme.
   */
  theme?: "light" | "dark" | "system";
  /**
   * The children to render inside the theme provider.
   */
  children: React.ReactNode;
};

export type MuiTheme = {
  /**
   * The theme object.
   */
  theme: Theme;
};
