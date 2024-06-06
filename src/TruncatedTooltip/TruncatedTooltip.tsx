import { Box, Tooltip } from "@mui/material";
import React, {
  Children,
  PropsWithChildren,
  ReactElement,
  isValidElement,
  useRef,
  useState
} from "react";

type Props = {
  tooltip?: string;
  children: React.ReactNode;
  component?: React.ElementType;
};

const TruncatedTooltip = (props: PropsWithChildren<Props>) => {
  const textElementRef = useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = useState(false);

  // if the text overflows its bounding box, then show the tooltip
  const handleShouldShow = ({
    currentTarget
  }: React.MouseEvent<HTMLDivElement | null>) => {
    setOpen(currentTarget.scrollWidth > currentTarget.clientWidth);
  };

  // on mouse leave, hide the tooltip
  const hideTooltip = () => setOpen(false);

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

  const text = props.children
    ? Children.map(props.children, child => {
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
      open={open}
      title={text}
      disableHoverListener={!open}
      onMouseEnter={handleShouldShow}
      onMouseLeave={hideTooltip}
    >
      <Box
        component={"span"}
        ref={textElementRef}
        sx={{
          "& *": {
            display: "inline"
          },
          display: "block",
          overflow: "hidden",
          textDecoration: "none",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        }}
      >
        {props.children}
      </Box>
    </Tooltip>
  );
};

export default TruncatedTooltip;
