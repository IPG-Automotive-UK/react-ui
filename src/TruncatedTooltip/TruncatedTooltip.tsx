import { Box, Tooltip } from "@mui/material";
import React, {
  Children,
  ReactElement,
  isValidElement,
  useEffect,
  useRef,
  useState
} from "react";

import { TruncatedTooltipProps } from "./TruncatedTooltip.types";

/**
 * Truncates text and shows a tooltip if the text overflows.
 * Automatically grabs the tooltip from child.
 * Renders a specified MUI component or element otherwise wraps string in a span.
 */
const TruncatedTooltip = <T extends React.ElementType = "span">({
  children,
  component,
  multiline,
  sx,
  tooltip,
  alwaysShowTooltip = false,
  TooltipProps = undefined,
  ...rest
}: TruncatedTooltipProps<T>) => {
  // Ref to the text element.
  const textElementRef = useRef<HTMLInputElement | null>(null);
  const [computedColor, setComputedColor] = useState<string>("inherit");
  useEffect(() => {
    if (textElementRef.current?.children.length) {
      // Fetch the computed styles dynamically
      const firstChild = textElementRef.current.children[0] as HTMLElement;
      const color = window.getComputedStyle(firstChild).color;
      setComputedColor(color);
    }
  }, []);
  // State to determine if the tooltip should show.
  const [open, setOpen] = useState(false);

  /**
   * If the text overflows, show the tooltip.
   */
  const handleShouldShow = ({
    currentTarget
  }: React.MouseEvent<HTMLDivElement | null>) => {
    setOpen(
      currentTarget.scrollWidth > currentTarget.clientWidth ||
        currentTarget.scrollHeight > currentTarget.clientHeight ||
        alwaysShowTooltip
    );
  };

  /**
   * Hide the tooltip.
   */
  const hideTooltip = () => setOpen(false);

  /**
   * Returns the text from a child element.
   * @param child Valid React element.
   * @returns string or null.
   */
  const getText = (child: ReactElement): string | null => {
    if (isValidElement(child)) {
      const props = child.props as { children?: React.ReactNode };
      if (props !== null && typeof props?.children === "string") {
        return props.children;
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  /**
   * Extracted text from children.
   */
  const text = children
    ? Children.map(children, child => {
        /**
         * If the child is a string, return the string.
         * If the child is a valid React element, return the text from the element.
         * Otherwise, return null.
         */
        if (typeof child === "string") {
          return child;
        } else if (isValidElement(child)) {
          return getText(child) || "";
        } else {
          return null;
        }
      })
    : "";

  return (
    <Tooltip
      {...TooltipProps}
      open={open}
      title={tooltip || text}
      disableHoverListener={!open}
      onMouseEnter={handleShouldShow}
      onMouseLeave={hideTooltip}
    >
      <Box
        component={component || "span"}
        ref={textElementRef}
        sx={[
          // You cannot spread `sx` directly because `SxProps` (typeof sx) can be an array.
          ...(Array.isArray(sx) ? sx : [sx]),
          {
            "& > *": {
              display: "inline"
            },
            color: computedColor,
            display: "block",
            overflow: "hidden",
            textDecoration: "none",
            textOverflow: "ellipsis",
            // Allow wrapping for multiline text
            whiteSpace: multiline ? "normal" : "nowrap",
            wordBreak: "break-all"
          },
          // Ensure multiline clamps to specified number of lines
          multiline
            ? {
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: multiline,
                display: "-webkit-box"
              }
            : {}
        ]}
        {...rest}
      >
        {children}
      </Box>
    </Tooltip>
  );
};

export default TruncatedTooltip;
