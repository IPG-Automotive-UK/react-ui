import { CSSProperties } from "react";

export interface SidebarItemProps {
  /**
   * The content of the component. Children are displayed in an expansion panel that is initially closed.
   */
  children?: React.ReactNode;
  /**
   * Css classname to add on the sidebar item.
   */
  className?: string;
  /**
   * The count to render within a badge.
   */
  count?: number;
  /**
   * If true, the sidebar item will be disabled.
   */
  disabled?: boolean;
  /**
   * Icon to display alongside text.
   */
  icon: React.ReactElement;
  /**
   * Custom style to apply to the icon
   */
  iconStyle?: CSSProperties;
  /**
   * Initial open state of sidebar item with children
   */
  initialOpen?: boolean;
  /**
   * The text content of the sidebar item.
   */
  name: string;
  /**
   * The display type of the sidebar item. Defaults to "in-line".
   * Where "in-line" displays the icon and text on the same line.
   * "stacked" displays the icon and text on separate lines.
   */
  display?: "in-line" | "stacked";
  /**
   * Callback fired when the user clicks on item.
   *
   * **Signature**
   * ```
   * function(event: object) => void
   * ```
   * _event_: The event source of the callback.
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /**
   * Use to apply selected styling.
   */
  selected?: boolean;
  /**
   * Custom style to apply to the text
   */
  textStyle?: CSSProperties;
}
