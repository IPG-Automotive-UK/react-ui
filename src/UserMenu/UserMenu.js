import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import withStyles from '@mui/styles/withStyles';
import { ExitToApp, VpnKey } from "@mui/icons-material";
import {
  bindMenu,
  bindTrigger,
  usePopupState
} from "material-ui-popup-state/hooks";
import PropTypes from "prop-types";
import React from "react";

const useStyles = makeStyles(theme => ({
  button: {
    height: 34,
    width: 34
  },
  divider: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1)
  },
  loggedInAs: {
    padding: theme.spacing(1, 2)
  },
  menu: {
    marginTop: theme.spacing(1)
  },
  noFocus: {
    "&:focus": {
      outline: "none"
    }
  }
}));

/**
 * User menu avatar and dropdown menu
 */
export default function UserMenu({ username, onChangePassword, onLogout }) {
  const classes = useStyles();
  const popupState = usePopupState({ popupId: "userMenu", variant: "popover" });
  const handleClick = cb => event => {
    popupState.close();
    cb(event);
  };
  return <>
    <IconButton className={classes.button} {...bindTrigger(popupState)} size="large">
      <UserAvatar username={username} />
    </IconButton>
    <Menu
      {...bindMenu(popupState)}
      getContentAnchorEl={null}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      className={classes.menu}
    >
      <Typography
        className={`${classes.loggedInAs} ${classes.noFocus}`}
        variant="body2"
      >
        Logged in as <strong>{!username ? "Unknown" : username}</strong>
      </Typography>
      <Divider className={classes.divider} />
      <MenuItem onClick={handleClick(onChangePassword)}>
        <ListItemIcon>
          <VpnKey />
        </ListItemIcon>
        <ListItemText>Change password</ListItemText>
      </MenuItem>
      <MenuItem onClick={handleClick(onLogout)}>
        <ListItemIcon>
          <ExitToApp />
        </ListItemIcon>
        <ListItemText>Logout</ListItemText>
      </MenuItem>
    </Menu>
  </>;
}

// prop types
UserMenu.propTypes = {
  /**
   * Callback fired when the user clicks on "Change password".
   *
   * **Signature**
   * ```
   * function(event: object) => void
   * ```
   * _event_: The event source of the callback.
   */
  onChangePassword: PropTypes.func.isRequired,
  /**
   * Callback fired when the user clicks on "Logout".
   *
   * **Signature**
   * ```
   * function(event: object) => void
   * ```
   * _event_: The event source of the callback.
   */
  onLogout: PropTypes.func.isRequired,
  /**
   * Name of currently logged in user.
   */
  username: PropTypes.string.isRequired
};

/**
 * User avatar
 *
 * Provides custom styling and converts username to max 2 initials
 */
const UserAvatar = withStyles(theme => ({
  root: {
    background: "none",
    border: `2px solid ${theme.palette.background.paper}`,
    fontSize: "13px",
    height: 34,
    width: 34
  }
}))(({ username, ...rest }) => {
  const allInitials = (!username ? "?" : username)
    .split(" ")
    .map(s => s[0])
    .join("")
    .toUpperCase();
  const initials =
    allInitials.length <= 2 ? allInitials : getFirstAndLastChars(allInitials);
  return <Avatar {...rest}>{initials}</Avatar>;
});

// returns the first and last chars of a string concatenated
function getFirstAndLastChars(str) {
  return [str.charAt(0), str.charAt(str.length - 1)].join("");
}
