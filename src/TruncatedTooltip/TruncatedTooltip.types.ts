import { SxProps, Theme, TooltipProps } from "@mui/material";

/**
 * Props for the TruncatedTooltip component
 */
export type TruncatedTooltipProps<T extends React.ElementType = "span"> = {
  /*
   * Overrides the default auto tooltip text
   */
  tooltip?: string;
  /*
   * Standard React Children prop
   */
  children: React.ReactNode;
  /**
   * Number of lines to display before truncating
   */
  multiline?: number;
  /**
   * Additional styles to apply
   */
  sx?: SxProps<Theme>;
  /**
   * Component to render
   */
  component?: T;
  /**
   * Optional prop to enable showing the tooltip also when the element is not truncated. Default value is false.
   */
  alwaysShowTooltip?: boolean;
  /**
   * Props for the MUI Tooltip component.
   */
  TooltipProps?: TooltipProps;
  /**
   * The additional types ensure the TruncatedTooltipProps is inferring props based on the passed component
   */
} & (T extends keyof JSX.IntrinsicElements
  ? JSX.IntrinsicElements[T]
  : T extends React.JSXElementConstructor<any>
    ? React.ComponentProps<T>
    : { children: React.ReactNode });
