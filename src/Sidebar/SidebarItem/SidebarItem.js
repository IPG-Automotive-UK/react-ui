import { ArrowDropDown, ArrowRight } from "@mui/icons-material";
import { Badge, Box, Collapse, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import PropTypes from "prop-types";
import React from "react";

// styling
const useStyles = makeStyles(theme => ({
  badge: {
    marginRight: theme.spacing(2)
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  selectedText: { fontWeight: 500 }
}));

/**
 * Sidebar list item with icon.
 */
export default function SidebarItem({
  children,
  className,
  count,
  disabled = false,
  icon,
  initialOpen = false,
  name,
  onClick,
  selected = false
}) {
  // use styles
  const classes = useStyles();
  const color = selected ? "primary" : "inherit";
  const primaryTypographyProps = {
    classes: {
      colorPrimary: classes.selectedText
    },
    color
  };

  // expansion state
  const [expanded, setExpanded] = React.useState(initialOpen);

  // item click callback
  // if we have children we should set the expanded state as well
  const handleClick = (...args) => {
    children && setExpanded(!expanded);
    onClick && onClick(...args);
  };

  // define components
  return (
    <Box display="flex" flexDirection="column">
      <ListItem
        button
        selected={selected}
        onClick={handleClick}
        disabled={disabled}
        className={className}
      >
        <ListItemIcon>{React.cloneElement(icon, { color })}</ListItemIcon>
        <ListItemText
          primary={name}
          primaryTypographyProps={primaryTypographyProps}
        />
        {count ? (
          <Badge
            badgeContent={count}
            max={9}
            color="primary"
            className={classes.badge}
          />
        ) : null}
        {children && (expanded ? <ArrowDropDown /> : <ArrowRight />)}
      </ListItem>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {React.Children.map(children, child =>
          React.cloneElement(child, { className: classes.nested })
        )}
      </Collapse>
    </Box>
  );
}

// set default props and types
SidebarItem.propTypes = {
  /**
   * The content of the component. Children are displayed in an expansion panel that is initially closed.
   */
  children: PropTypes.node,
  /**
   * Css classname to add on the sidebar item.
   */
  className: PropTypes.string,
  /**
   * The count to render within a badge.
   */
  count: PropTypes.number,
  /**
   * If true, the sidebar item will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Icon to display alongside text.
   */
  icon: PropTypes.element.isRequired,
  /**
   * Initial open state of sidebar item with children
   */
  initialOpen: PropTypes.bool,
  /**
   * The text content of the sidebar item.
   */
  name: PropTypes.string.isRequired,
  /**
   * Callback fired when the user clicks on item.
   *
   * **Signature**
   * ```
   * function(event: object) => void
   * ```
   * _event_: The event source of the callback.
   */
  onClick: PropTypes.func,
  /**
   * Use to apply selected styling.
   */
  selected: PropTypes.bool
};
