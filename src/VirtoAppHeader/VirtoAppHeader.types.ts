export type VirtoAppHeaderProps = {
  /**
   * App name to display in header.
   */
  appName: string;
  /**
   * Base URL for VIRTO home page.
   */
  baseUrl?: string;
  /**
   * The color mode selection
   * @default "light"
   */
  mode?: "light" | "dark";
  /**
   * Callback fired when the user clicks on "Change password".
   */
  onChangePassword: (event: React.MouseEvent<HTMLElement>) => void;
  /**
   * Callback fired when the user clicks on "Logout".
   */
  onLogout: (event: React.MouseEvent<HTMLElement>) => void;
  /**
   * Callback fired when the color mode is changed.
   */
  onColourModeChange: (newMode: "light" | "dark") => void;
  /**
   * Name of currently logged in user.
   */
  username: string;
  /**
   * A String of the href URL for the Link of the VIRTO Logo
   */
  virtoLogoLinkUrl?: string;
  /**
   * callback is fired when user clicks on "menu"
   */
  onMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
  /**
   * callback is fired when user clicks on "App"
   */
  onAppClick: (event: React.MouseEvent<HTMLElement>) => void;
};
