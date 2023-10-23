export type LoadErrorMessageProps = {
  showImg: boolean; // Whether to show the VirtoThinking SVG or not
  title: string; // The title of the error message
  message: string; // The main message of the error message
  errorDetails: string; // The details of the error message
  contactTeam: "Support" | "Customer Service"; // The team to contact if the error persists
  supportUrl: string; // The URL to the support page
  actionButtonText?: string; // The text to display on the action button (optional)
  onButtonClick?: () => void; // The function to call when the action button is clicked (optional)
};
