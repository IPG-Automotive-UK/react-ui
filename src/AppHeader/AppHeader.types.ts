export interface AppHeaderProps {
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
   *
   * **Signature**
   * ```
   * function(event: object) => void
   * ```
   * _event_: The event source of the callback.
   */
  onChangePassword: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Callback fired when the user clicks on "Logout".
   *
   * **Signature**
   * ```
   * function(event: object) => void
   * ```
   * _event_: The event source of the callback.
   */
  onLogout: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Callback fired when the color mode is changed.
   *
   * **Signature**
   * ```
   * function(newMode) => void
   * ```
   *
   * _newMode_: The new color mode that has been selected
   */
  onModeChange: (newMode: "light" | "dark") => void;
  /**
   * Name of currently logged in user.
   */
  username: string;
  /**
   * A String of the href URL for the Link of the VIRTO Logo, default is null (link disabled)
   */
  virtoLogoLinkUrl?: string;
  /**
   * callback is fired when user clicks on "menu"
   */
  onMenuClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * callback is fired when user clicks on "App"
   */
  onAppClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
