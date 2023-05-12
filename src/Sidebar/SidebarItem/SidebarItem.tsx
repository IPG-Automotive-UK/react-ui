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
  textStyle = {},
  display = "inline"
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

  // Count badge component that displays the count
  const CountBadge = () => {
    return count ? (
      <Badge
        badgeContent={count}
        max={9}
        color="primary"
        // if display is inline then add a margin to the right
        sx={{
          ...(display === "inline"
            ? { marginRight: (theme: Theme) => theme.spacing(3) }
            : {})
        }}
      />
    ) : null;
  };

  // Expand icon component that displays the expand icon depending on the expanded state
  const ExpandIcon = () => {
    return children ? (
      expanded ? (
        <Badge badgeContent={<ArrowDropDown />} />
      ) : (
        <Badge badgeContent={<ArrowRight />} />
      )
    ) : null;
  };

  // Sidebar In Line component that gets displayed when the display prop is set to inline
  const SidebarInLine = () => {
    return (
      <React.Fragment>
        <ListItemIcon sx={iconStyle}>
          {React.cloneElement(icon, { color })}
        </ListItemIcon>
        <ListItemText
          primary={name}
          primaryTypographyProps={primaryTypographyProps}
          sx={textStyle}
        />
        <CountBadge />
        <ExpandIcon />
      </React.Fragment>
    );
  };

  // Sidebar Stacked component that gets displayed when the display prop is set to stacked
  const SidebarStacked = () => {
    return (
      <Box
        display="flex"
        width="100%"
        flexDirection="row"
        justifyContent="center"
      >
        <Box display="flex" flexDirection="column" justifyContent="center">
          <ListItemIcon
            sx={{
              display: "flex",
              justifyContent: "center",
              ...iconStyle
            }}
          >
            {React.cloneElement(icon, {
              color,
              fontSize: "large"
            })}
            <CountBadge />
          </ListItemIcon>
          <ExpandIcon />
          <ListItemText
            primary={name}
            primaryTypographyProps={primaryTypographyProps}
            sx={{
              display: "flex",
              justifyContent: "center",
              ...textStyle
            }}
          />
        </Box>
      </Box>
    );
  };

  // return the sidebar item component
  return (
    <Box display="flex" flexDirection="column">
      <ListItemButton
        selected={selected}
        onClick={handleClick}
        disabled={disabled}
        className={className}
        sx={{
          ...(display === "inline" ? {} : { pb: 2, pl: 0, pr: 0, pt: 2 }),
          ...(selected === true
            ? {
                borderRight: "2px solid",
                borderColor: theme => theme.palette.primary.main
              }
            : {})
        }}
      >
        {display === "inline" ? <SidebarInLine /> : <SidebarStacked />}
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
