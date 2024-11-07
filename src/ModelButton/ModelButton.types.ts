import { Theme } from "@mui/material";

/**
 * The props needed to define Background component
 */
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

/**
 * The props needed to define Model Button
 */
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

/**
 * The props needed to define Model Button Popup
 */
type ModelButtonPopupProps = {
  /**
   * Current status
   */
  status: string;
  /**
   * Children
   */
  children?: React.ReactNode;
  /**
   * The color of the button border
   */
  color: string;
  /**
   * The color of the button border when hovered
   */
  colorHover: string;
  /**
   * If `true`, the button will be disabled. Default is `false`.
   */
  disabled: boolean;
  /**
   * The label text to display. Default is an empty string.
   */
  label: string;
};

/**
 * The props needed to call getCurrentIconBackgroundColor function
 */
type CurrentIconBackgroundColorProps = {
  /**
   * Whether hover effect is available
   */
  isHover: boolean;
  /**
   * Status of the current ModelButton
   */
  status: ModelButtonProps["status"];
  /**
   * Theme refrence
   */
  theme: Theme;
};

export type {
  BackgroundProps,
  ModelButtonProps,
  ModelButtonPopupProps,
  CurrentIconBackgroundColorProps
};
