import { ArrowDropDown, ArrowRight } from "@material-ui/icons";
import {
  Badge,
  Box,
  Collapse,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  makeStyles
} from "@material-ui/core";
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
 * Sidebar list item with icon and tooltip.
 */
export default function SidebarItem({
  children,
  className,
  count,
  disabled = false,
  icon,
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
  const [expanded, setExpanded] = React.useState(false);

  // item click callback
  // if we have children we should set the expanded state as well
  const handleClick = (...args) => {
    children && setExpanded(!expanded);
    onClick && onClick(...args);
  };

  // define components
  return (
    <Box display="flex" flexDirection="column">
      <Tooltip title={name} placement="right">
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
          <Badge
            badgeContent={count}
            max={9}
            color="primary"
            className={classes.badge}
          />
          {children && (expanded ? <ArrowDropDown /> : <ArrowRight />)}
        </ListItem>
      </Tooltip>
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
