import { ArrowDropDown, ArrowRight } from "@mui/icons-material";
import {
  Badge,
  Box,
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";

import React from "react";
import { SidebarItemProps } from "./SidebarItem.types";
import { Theme } from "@mui/material/styles";

/**
 * Sidebar list item with icon.
 */
export default function SidebarItem({
  children,
  className,
  count,
  disabled = false,
  icon,
  iconStyle = {},
  initialOpen = false,
  name,
  onClick,
  selected = false,
  textStyle = {}
}: SidebarItemProps) {
  // use styles
  const color = selected ? "primary" : "inherit";
  const primaryTypographyProps = {
    color,
    sx: {
      colorPrimary: { fontWeight: 500 }
    }
  };

  // expansion state
  const [expanded, setExpanded] = React.useState(initialOpen);

  // item click callback
  // if we have children we should set the expanded state as well
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    children && setExpanded(!expanded);
    onClick && onClick(event);
  };

  // define components
  return (
    <Box display="flex" flexDirection="column">
      <ListItemButton
        selected={selected}
        onClick={handleClick}
        disabled={disabled}
        className={className}
      >
        <ListItemIcon sx={iconStyle}>
          {React.cloneElement(icon, { color })}
        </ListItemIcon>
        <ListItemText
          primary={name}
          primaryTypographyProps={primaryTypographyProps}
          sx={textStyle}
        />
        {count ? (
          <Badge
            badgeContent={count}
            max={9}
            color="primary"
            sx={{ marginRight: theme => theme.spacing(2) }}
          />
        ) : null}
        {children && (expanded ? <ArrowDropDown /> : <ArrowRight />)}
      </ListItemButton>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {React.Children.map(children, child =>
          React.cloneElement(child as React.ReactElement, {
            sx: { paddingLeft: (theme: Theme) => theme.spacing(4) }
          })
        )}
      </Collapse>
    </Box>
  );
}
