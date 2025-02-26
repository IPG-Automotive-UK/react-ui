import {
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
  useColorScheme
} from "@mui/material";
import { Key, Logout } from "@mui/icons-material";
import React, { Fragment } from "react";
import {
  bindMenu,
  bindTrigger,
  usePopupState
} from "material-ui-popup-state/hooks";

import RadioButtons from "../RadioButtons";
import { UserAvatar } from "../UserAvatar";
import { UserMenuProps } from "./UserMenu.types";

// styling
const sx = {
  button: {
    height: 34,
    width: 34
  },
  divider: {
    marginBottom: 1,
    marginTop: 1
  },
  loggedInAs: {
    "&:focus": {
      outline: "none"
    },
    px: 2,
    py: 1
  },
  menu: {
    marginTop: 1
  }
};

/**
 * User menu avatar and dropdown menu
 */
export default function UserMenu({
  user,
  onChangePassword,
  onLogout
}: UserMenuProps) {
  // use hook from MUI to get and set the theme mode
  const { mode, setMode } = useColorScheme();

  // get the name and email from the user object
  const { name, email } = user;

  // format the mode to have the first letter capitalized to match the radio button value
  const formattedMode = mode
    ? mode === "system"
      ? "System Preference"
      : mode.charAt(0).toUpperCase() + mode.slice(1)
    : "Light";

  // use the popup state hook to manage the state of the popup
  const popupState = usePopupState({ popupId: "userMenu", variant: "popover" });

  const handleClick =
    (cb: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void) =>
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      popupState.close();
      cb && cb(event);
    };

  // function to handle the theme change on click of the radio button
  const onThemeChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
    // get the value from the event
    let value = event.target.value;

    // if the value is "System Preference", set it to "system
    if (value === "System Preference") {
      value = "system";
    }

    // convert the value to lowercase and set the mode
    const valueForLocalStorage = value.toLowerCase() as
      | "light"
      | "dark"
      | "system";

    setMode(valueForLocalStorage);
  };
  return (
    <Fragment>
      <IconButton {...bindTrigger(popupState)} size="large" sx={sx.button}>
        <UserAvatar
          name={name}
          sx={theme => ({
            backgroundColor: theme.palette.grey[400],
            height: 34,
            width: 34
          })}
        />
      </IconButton>
      <Menu
        {...bindMenu(popupState)}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={sx.menu}
        slotProps={{ paper: { sx: { width: 350 } } }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 500
            }}
          >
            {!name ? "Unknown" : name}
          </Typography>
          <Typography
            sx={theme => ({
              color: theme.palette.text.secondary
            })}
            variant="caption"
          >
            {!email ? "Unknown" : email}
          </Typography>
        </Box>
        <Divider sx={sx.divider} />
        <MenuItem onClick={handleClick(onChangePassword)}>
          <ListItemIcon>
            <Key />
          </ListItemIcon>
          <ListItemText>Change password</ListItemText>
        </MenuItem>
        <Box sx={{ mt: 1.5, px: 2 }}>
          <RadioButtons
            value={formattedMode}
            onChange={onThemeChange()}
            title="Theme"
            options={["Light", "Dark", "System Preference"]}
            style={{
              ml: 1.5
            }}
          />
        </Box>
        <Divider sx={sx.divider} />
        <MenuItem onClick={handleClick(onLogout)}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </Fragment>
  );
}
