export interface AppHeaderProps {
  /**
   * App name to display in header.
   */
  appName: string;
  /**
   * Children to render in header on the left side, but right of the dark mode toggle.
   */
  children?: React.ReactNode;
  /**
   * The color mode selection
   * @default "light"
   */
  mode?: "light" | "dark";
  /**
   * Callback fired when the user clicks on "Change password".
   */
  onChangePassword: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Callback fired when the user clicks on "Logout".
   */
  onLogout: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Callback fired when the color mode is changed.
   */
  onColourModeChange: (newMode: "light" | "dark") => void;
  /**
   * Name of currently logged in user.
   */
  username: string;
}
