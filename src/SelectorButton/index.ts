import SelectorButton from "./SelectorButton";

export type SelectorButtonProps = {
  /**
   * MUI icon to render in the center of the button
   */
  icon: React.ReactNode;
  /**
   * The text to render below the icon
   */
  text: string;
  /**
   * The description to render below the text
   */
  description: string;
  /**
   * OnClick handler for the button
   * @returns A clientside redirect to the upload wizard for
   */
  onClick: () => void;
};
export default SelectorButton as React.FC<SelectorButtonProps>;
