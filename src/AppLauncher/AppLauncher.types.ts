export interface AppLauncherProps {
  /**
   * Base URL for VIRTO home page. All apps are served relative to this URL.
   * @default 'http://localhost:3000'
   * @type {string}
   */
  baseUrl?: string | undefined;
  /**
   * A String of the href URL for the Link of the IPG Logo, default is null (link disabled)
   */
  ipgLogoLink?: string | undefined;
  /**
   * Callback fired when the user clicks on App Button.
   *
   * **Signature**
   * ```
   * function(event: object) => void
   * ```
   * _event_: The event source of the callback.
   */
  onAppButtonClick: () => void;
  /**
   * Boolean to determine if logo should be displayed at the top of the AppLauncher
   */
  showLogo?: boolean | undefined;
}
