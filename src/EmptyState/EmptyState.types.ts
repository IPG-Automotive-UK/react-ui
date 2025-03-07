/**
 * This type defines the props for the EmptyState component.
 */
export type EmptyStateProps = {
  /**
   * Optional title for the empty state
   */
  title?: string;
  /**
   * Optional subtitle providing more context
   */
  subtitle?: string;
  /**
   * Optional icon to display (React element like SvgIcon, img, etc.)
   */
  icon?: React.ReactElement;
  /**
   * Optional actions (buttons or other interactive elements)
   */
  actions?: React.ReactElement[];
};
