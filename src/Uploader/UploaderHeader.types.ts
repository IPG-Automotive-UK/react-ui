export type UploaderHeaderProps = {
  /**
   * Callback fired when the delete button is clicked
   */
  onDelete?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * Disables interaction if true
   */
  disabled?: boolean;
  /**
   * Is field required?
   */
  required?: boolean;
  /**
   * Should the delete button be visible>
   */
  showDelete?: boolean;
  /**
   * Text to display in sub text
   */
  subText?: string;
  /**
   * Text to display in title
   */
  title?: string;
  /**
   * Typography variant for title
   */
  titleVariant?: "title" | "subtitle" | "body";
};
