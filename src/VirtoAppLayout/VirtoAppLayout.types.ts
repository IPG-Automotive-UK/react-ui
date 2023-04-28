export interface VirtoAppLayoutProps {
  /**
   * App name to display in header.
   */
  appName: string;
  /**
   * App version to display at base of sidebar.
   */
  appVersion?: string;
  /**
   * Base URL for VIRTO home page.
   */
  baseUrl?: string;
  /**
   * The RHS content of the component app. Valid react element can be used.
   */
  content: React.ReactNode;
  /**
   * Callback fired when the user clicks on "Change password".
   *
   * **Signature**
   * ```
   * function(event: object) => void
   * ```
   * _event_: The event source of the callback.
   */
  onChangePassword: (event: React.MouseEvent<HTMLElement>) => void;
  /**
   * Callback fired when the user clicks on "Logout".
   *
   * **Signature**
   * ```
   * function(event: object) => void
   * ```
   * _event_: The event source of the callback.
   */
  onLogout: (event: React.MouseEvent<HTMLElement>) => void;
  /**
   * The content of the component. Recommended children are SidebarItem and SidebarDivider, but any valid react element can be used.
   */
  sidebarContent: React.ReactNode;
  /**
   * Name of currently logged in user.
   */
  username: string;
  /**
   * A String of the href URL for the Link of the VIRTO Logo, default is null (link disabled)
   */
  virtoLogoLinkUrl?: string;
}
