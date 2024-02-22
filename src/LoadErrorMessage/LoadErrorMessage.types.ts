export type LoadErrorMessageProps = {
  /**
   * The text to display on the action button (optional).
   */
  actionButtonText?: string;
  /**
   * The team to contact if the error persists.
   */
  contactTeam?: "none" | "Support" | "Customer Service";
  /**
   * The URL to the support page (optional).
   */
  contactUrl?: string;
  /**
   * The details of the error message (optional).
   */
  errorDetails?: string;
  /**
   * Whether to show the VirtoThinking SVG or not.
   */
  image?:
    | "none"
    | "virto-thinking"
    | "virto-shrugging"
    | "virto-head-scratching";
  /**
   * The main message of the error message.
   */
  message: string;
  /**
   * The function to call when the action button is clicked (optional).
   */
  onButtonClick?: () => void;
  /**
   * The title of the error message.
   */
  title: string;
};
