import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography
} from "@mui/material";
import { ExitToApp, VpnKey } from "@mui/icons-material";
import React, { Fragment } from "react";
import { UserAvatarProps, UserMenuProps } from "./UserMenu.types";
import {
  bindMenu,
  bindTrigger,
  usePopupState
} from "material-ui-popup-state/hooks";

import { Theme } from "@mui/material/styles";

// styling
const sx = {
  button: {
    height: 34,
    width: 34
  },
  divider: {
    marginBottom: (theme: Theme) => theme.spacing(1),
    marginTop: (theme: Theme) => theme.spacing(1)
  },
  loggedInAs: {
    "&:focus": {
      outline: "none"
    },
    padding: (theme: Theme) => theme.spacing(1, 2)
  },
  menu: {
    marginTop: (theme: Theme) => theme.spacing(1)
  }
};

/**
 * User menu avatar and dropdown menu
 */
export default function UserMenu({
  username,
  onChangePassword,
  onLogout
}: UserMenuProps) {
  const popupState = usePopupState({ popupId: "userMenu", variant: "popover" });
  const handleClick =
    (cb: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void) =>
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      popupState.close();
      cb && cb(event);
    };
  return (
    <Fragment>
      <IconButton {...bindTrigger(popupState)} size="large" sx={sx.button}>
        <UserAvatar username={username} />
      </IconButton>
      <Menu
        {...bindMenu(popupState)}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={sx.menu}
      >
        <Typography sx={sx.loggedInAs} variant="body2">
          Logged in as <strong>{!username ? "Unknown" : username}</strong>
        </Typography>
        <Divider sx={sx.divider} />
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
    </Fragment>
  );
}

/**
 * User avatar
 *
 * Provides custom styling and converts username to max 2 initials
 */
const UserAvatar = ({ username, ...rest }: UserAvatarProps) => {
  const allInitials = (!username ? "?" : username)
    .split(" ")
    .map(s => s[0])
    .join("")
    .toUpperCase();
  const initials =
    allInitials.length <= 2 ? allInitials : getFirstAndLastChars(allInitials);
  return (
    <Avatar
      {...rest}
      sx={{
        backgroundColor: "#bdbdbd",
        border: "2px solid #bdbdbd",
        color: "white",
        fontSize: "13px",
        height: 34,
        width: 34
      }}
    >
      {initials}
    </Avatar>
  );
};

// returns the first and last chars of a string concatenated
function getFirstAndLastChars(str: string) {
  return [str.charAt(0), str.charAt(str.length - 1)].join("");
}
