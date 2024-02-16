export type LoadErrorMessageProps = {
  /**
   * Whether to show the VirtoThinking SVG or not.
   */
  image?:
    | "none"
    | "virto-thinking"
    | "virto-shrugging"
    | "virto-head-scratching";
  /**
   * The title of the error message.
   */
  title: string;
  /**
   * The main message of the error message.
   */
  message: string;
  /**
   * The details of the error message (optional).
   */
  errorDetails?: string;
  /**
   * The team to contact if the error persists.
   */
  contactTeam?: "Support" | "Customer Service";
  /**
   * The URL to the support page (optional).
   */
  supportUrl?: string;
  /**
   * Whether to show the contact team and support URL or not.
   */
  showContact?: boolean;
  /**
   * The text to display on the action button (optional).
   */
  actionButtonText?: string;
  /**
   * The function to call when the action button is clicked (optional).
   */
  onButtonClick?: () => void;
};
