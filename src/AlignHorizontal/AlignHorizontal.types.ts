export interface AlignHorizontalProps {
  /**
   * If true, the component is disabled.
   */
  disabled?: boolean;
  /**
   * Callback fired when the value changes.
   *
   * **Signature**
   * ```
   * function(event: React.MouseEvent<HTMLElement>, value: any) => void
   * ```
   * event: The event source of the callback.
   * value: The value of the selected button.
   */
  onChange: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    value: "left" | "center" | "right" | "justify" | null
  ) => void;
  /**
   * The orientation of the toggle button group.
   */
  orientation?: "horizontal" | "vertical";
  /**
   * The size of the component.
   */
  size?: "small" | "medium" | "large";
  /**
   * The value of the selected button.
   */
  value?: "left" | "center" | "right" | "justify" | null;
}
