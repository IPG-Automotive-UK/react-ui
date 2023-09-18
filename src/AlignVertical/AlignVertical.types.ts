export type AlignVerticalProps = {
  /**
   * If true, the component is disabled.
   */
  disabled?: boolean;
  /**
   * Callback fired when the value changes.
   */
  onChange: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    value: "bottom" | "center" | "top" | null
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
  value?: "bottom" | "center" | "top" | null;
};
