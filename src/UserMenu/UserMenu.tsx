import {
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
import {
  bindMenu,
  bindTrigger,
  usePopupState
} from "material-ui-popup-state/hooks";

import { Theme } from "@mui/material/styles";
import { UserAvatar } from "../UserAvatar";
import { UserMenuProps } from "./UserMenu.types";

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
        <UserAvatar
          name={username}
          color="#bdbdbd"
          sx={{
            color: "#fff",
            height: 34,
            width: 34
          }}
        />
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
