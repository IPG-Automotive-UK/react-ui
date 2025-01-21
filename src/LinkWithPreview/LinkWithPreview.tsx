import { Card, Link, Popper, Typography, useTheme } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import type { LinkWithPreviewProps } from "./LinkWithPreview.types";

/**
 * A component that behaves like a link, but on hover renders a component
 * @param href The url to which the link points to
 * @param sx The MUI styles object used to control the look of the link
 * @param content The component that will render on hover
 * @param children The text that will be wrapped in a link
 */
export default function LinkWithPreview({
  href,
  sx,
  content,
  children,
  color = "primary",
  variant = "body2"
}: LinkWithPreviewProps) {
  const theme = useTheme();

  // anchor element for the popper
  const anchorEl = useRef<HTMLElement | null>(null);

  // popper ref element
  const popperRef = useRef<HTMLDivElement | null>(null);

  // open state for the popper
  const [open, setOpen] = useState<boolean>(false);

  // timeout reference for the delay
  const timeoutRef = useRef<NodeJS.Timeout | undefined>();

  // prevent the popper from closing when the mouse enters the popper
  const handlePopperEnter = () => {
    clearTimeout(timeoutRef.current);
  };

  // close the popper when the mouse leaves the popper
  const handlePopperLeave = () => {
    // set a 300 ms delay timeout to close the popper
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 300);
  };

  // open the popper when the mouse enters the label
  const handleLabelEnter = () => {
    clearTimeout(timeoutRef.current);
    // set a 1 second delay timeout to open the popper
    timeoutRef.current = setTimeout(() => {
      setOpen(true);
    }, 1000);
  };

  // close the popper when the mouse leaves the label
  const handleLabelLeave = () => {
    clearTimeout(timeoutRef.current);
    // set a 300 ms delay timeout to close the popper
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 300);
  };

  // cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  // Function to detect if the mouse is currently hovering over the popper
  const isMouseOverPopper = (event: MouseEvent) => {
    if (popperRef.current) {
      const { left, top, right, bottom } =
        popperRef.current.getBoundingClientRect();
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      // flag to indicate if pointer inside the popper
      const isInsidePopper =
        mouseX >= left && mouseX <= right && mouseY >= top && mouseY <= bottom;
      return isInsidePopper;
    }
    return false;
  };

  // callback function for click event when popper is open
  const handleClickOutside = (event: MouseEvent) => {
    const clickedOutsidePopper =
      popperRef.current &&
      !popperRef.current.contains(event.target as Node) &&
      anchorEl.current &&
      !anchorEl.current.contains(event.target as Node);

    // If clicked outside (potentially on the backdrop), check if the mouse is over the popper
    if (clickedOutsidePopper && !isMouseOverPopper(event)) {
      // Close the popper if mouse is not over it after the click
      setOpen(false);
    }
  };

  // useEffect to manage click event listener for outside clicks
  useEffect(() => {
    // if the popper is open then we can add the event listener
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // clean up  on unmount for click outside handler
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <>
      <Typography
        data-test="link-text"
        ref={anchorEl}
        onMouseEnter={handleLabelEnter}
        onMouseLeave={handleLabelLeave}
        onClick={event => event.stopPropagation()}
        variant={variant}
        noWrap
        sx={[
          {
            display: "flex",
            fontWeight: 400
          },
          ...(Array.isArray(sx) ? sx : [sx])
        ]}
      >
        {
          <Link
            href={href}
            target="_blank"
            underline="hover"
            color={color}
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "inherit"
            }}
          >
            {children}
          </Link>
        }
      </Typography>
      <Popper
        data-testid="preview-popper"
        open={open}
        anchorEl={anchorEl.current}
        onMouseEnter={handlePopperEnter}
        onMouseLeave={handlePopperLeave}
        ref={popperRef}
        placement="bottom-start"
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 8]
              }
            }
          ]
        }}
        sx={{ width: "480px", zIndex: theme.zIndex.modal }}
      >
        <Card data-testid="preview-content">{content}</Card>
      </Popper>
    </>
  );
}
