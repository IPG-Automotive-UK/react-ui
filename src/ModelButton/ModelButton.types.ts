type BackgroundProps = {
  /**
   * The color of the border
   */
  borderColor: string;
  /**
   * The color of the background
   */
  backgroundColor: string;
};

type ModelButtonProps = {
  /**
   * Children
   */
  children?: React.ReactNode;
  /**
   * If `true`, the button will be disabled. Default is `false`.
   */
  disabled?: boolean;
  /**
   * The icon component to render inside the button. Can be set to `null` to not display an icon. MUI SVG icons are recommended.
   */
  icon?: React.ReactElement<
    any,
    string | React.JSXElementConstructor<any>
  > | null;
  /**
   * The label text to display. Default is an empty string.
   */
  label?: string;
  /**
   * Callback fired when the button is clicked.
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /**
   * The status string that determines the border color of the button. Default is `none`.
   */
  status?: "none" | "error" | "warning" | "success";
};

type ModelButtonPopupProps = {
  /**
   * Children
   */
  children?: React.ReactNode;
  /**
   * The color of the button
   */
  color: string;
  /**
   * If `true`, the button will be disabled. Default is `false`.
   */
  disabled: boolean;
  /**
   * The label text to display. Default is an empty string.
   */
  label: string;
};

export type { BackgroundProps, ModelButtonProps, ModelButtonPopupProps };
