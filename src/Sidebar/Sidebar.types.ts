export type SidebarProps = {
  /**
   * App version to display at base of sidebar.
   */
  appVersion?: string;
  /**
   * The content of the component. Recommended children are SidebarItem and SidebarDivider, but any valid react element can be used.
   */
  children?: React.ReactNode;
  /**
   * Boolean to determine if logo should be displayed at the bottom of the sidebar
   */
  showLogo?: boolean;
  /**
   * Boolean to determine if version should be displayed at the bottom of the sidebar
   */
  showVersion?: boolean;
};
