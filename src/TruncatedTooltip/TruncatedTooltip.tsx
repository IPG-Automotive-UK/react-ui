import { Box, Tooltip } from "@mui/material";
import React, { Children, ReactElement, isValidElement, useState } from "react";

import { TruncatedTooltipProps } from "./TruncatedTooltip.types";

// https://fettblog.eu/typescript-react-generic-forward-refs/#option-3%3A-augment-forwardref
// Note; In React 19 we will no longer need to use (or augment) the forwardRef type.
declare module "react" {
  // eslint-disable-next-line no-unused-vars
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactNode | null
  ): (props: P & React.RefAttributes<T>) => React.ReactNode | null;
}

/**
 * Truncates text and shows a tooltip if the text overflows.
 * Automatically grabs the tooltip from child.
 * Renders a specified MUI component or element otherwise wraps string in a span.
 */
function TruncatedTooltipInner<T extends React.ElementType = "span">(
  {
    children,
    component,
    multiline,
    sx,
    tooltip,
    alwaysShowTooltip = false,
    TooltipProps = undefined,
    ...rest
  }: TruncatedTooltipProps<T>,
  ref: React.ForwardedRef<T>
) {
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
        sx={[
          {
            "& > *": {
              display: "inline"
            },
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
            : {},
          // You cannot spread `sx` directly because `SxProps` (typeof sx) can be an array.
          ...(Array.isArray(sx) ? sx : [sx])
        ]}
        ref={ref}
        {...rest}
      >
        {children}
      </Box>
    </Tooltip>
  );
}

// forward ref
const TruncatedTooltip = React.forwardRef(TruncatedTooltipInner);

export default TruncatedTooltip;
