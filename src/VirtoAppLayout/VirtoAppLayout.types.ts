import { User } from "../UserMenu/UserMenu.types";

export type VirtoAppLayoutProps = {
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
   * A String of the href URL for the Link of the Customer Logo, default is null (link disabled)
   */
  customerLogo?: string;
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
   * The user details.
   */
  user: User;
  /**
   * A String of the href URL for the Link of the VIRTO Logo, default is null (link disabled)
   */
  virtoLogoLinkUrl?: string;
};

export type HeaderProps = {
  /**
   * App name to display in header.
   */
  appName: string;
  /**
   * Base URL for VIRTO home page.
   */
  baseUrl?: string;
  /**
   * A String of the href URL for the Link of the Customer Logo, default is null (link disabled)
   */
  customerLogo?: string;
  /**
   * Callback fired when the user clicks on "Change password".
   */
  onChangePassword: (event: React.MouseEvent<HTMLElement>) => void;
  /**
   * Callback fired when the user clicks on "Logout".
   */
  onLogout: (event: React.MouseEvent<HTMLElement>) => void;
  /**
   * The user details.
   */
  user: User;
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
